// This file will loop through all Ghost installations
// and install the new ghata storage adapter

import path from 'path'
import { promises as fs } from 'fs'

import { forEach } from '../utilities/loops'
import logger from './logger'
import { Answers } from './prompts'

export default async function install(answers: Answers): Promise<void> {
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
    const adapterPath = path.join(__dirname, '..', 'adapter')

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
            logger.warning(
                `A version of ghata is already installed on ${path.basename(
                    version,
                )}`,
            )
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

    // tell the user we have finished installation process
    logger.success('Finished installing ghata storage adapter for Ghost')
}
