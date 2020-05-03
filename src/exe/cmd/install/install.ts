// This file will loop through all Ghost installations
// and install the new ghata storage adapter

import path from 'path'
import { promises as fs } from 'fs'

import ora from 'ora'
import chalk from 'chalk'
import exec from 'execa'

import { forEach } from '../../../utilities/loops'
import logger from '../../logger'
import { Answers } from './prompts'

export default async function install(
    answers: Answers,
    auto: boolean,
    execString: string,
): Promise<void> {
    // create the new cli spinner
    const spinner = ora({
        hideCursor: true,
        text: 'Installing 🍯 ghata',
    })

    // show the spinner only if auto is disabled
    if (!auto) {
        spinner.start()
    }

    // convert the path to absolute in case the user has given a relative one
    const resolved = path.resolve(answers.path)
    const versions = path.join(resolved, 'versions')

    // the variable that stores the paths to compatible versions of
    // Ghost detected in the installation path
    const compatibleVersions: string[] = []

    // loop through the versions directory and check for compatible versions
    // of Ghost
    await forEach(await fs.readdir(versions), (version: string) => {
        if (version.startsWith('3.')) {
            const versionPath = path.join(versions, version)
            compatibleVersions.push(versionPath)
        }
    })

    // prepare the adapter path
    let adapterPath
    if (auto) {
        adapterPath = path.join(__dirname, '..', '..', '..', 'adapter')
    } else {
        adapterPath = path.join(__dirname, '..', 'adapter')
    }

    // loop through all the versions to install ghata
    // storage adapter
    await forEach(compatibleVersions, async (version: string) => {
        // prepare the path where ghata will be installed
        const installPath = path.join(
            version,
            'core',
            'server',
            'adapters',
            'storage',
            'ghata',
        )

        // create a symlink if it doesn't exist already
        // or else, show the warning that ghata is already install
        // and skip this step
        try {
            await fs.symlink(adapterPath, installPath)
        } catch {
            true
        }
    })

    // read the config json file
    const config = JSON.parse(
        (await fs.readFile(answers.config, { encoding: 'UTF-8' })) as string,
    )

    // set the storage adapter as "ghata" 😎
    config['storage'] = {
        active: 'ghata',
        ghata: {
            endpoint: answers.endpoint,
            subdomain: answers.subdomain,
            spacePath: answers.spacePath,
            bucket: answers.bucketName,
            key: answers.spaceKey,
            secret: answers.secretKey,
        },
    }

    // write back the config file
    await fs.writeFile(answers.config, JSON.stringify(config, null, 4), {
        encoding: 'UTF-8',
    })

    // only if auto disabled, we also restart Ghost
    if (!auto) {
        try {
            await exec('ghost', ['restart'])
        } catch {
            true
        }
    }

    // tell the user we have finished installation process
    if (!auto) {
        spinner.stopAndPersist({
            text: 'Finished installing 🍯 ghata',
            symbol: chalk.greenBright.bold('✓'),
        })
    } else {
        logger.success(
            'Finished 💿 installing 🍯 ghata storage 🔌 adapter for 👻 Ghost',
        )
    }

    // start the exec command
    // if we are in auto mode
    if (auto) {
        const exe = exec.command(execString)
        exe.stdout.pipe(process.stdout)
        exe.stderr.pipe(process.stderr)
    }
}
