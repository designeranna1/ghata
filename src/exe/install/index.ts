/*
 *  This file will install ghata to a specified Ghost installation.
 *  Created On 06 May 2020
 */

import ora from 'ora'
import chalk from 'chalk'
import symbols from 'log-symbols'

import { AnswersImpl, ParsedArgsImpl } from '../interfaces'
import logger from '../logger'
import skip from './skip'
import dependencies from './dependencies'
import install from './install'
import link from './link'
import configure from './configure'
import restore from './restore'
import restart from './restart'

export default async function startInstallation(
    answers: AnswersImpl,
    options: ParsedArgsImpl,
): Promise<void> {
    // create the new cli spinner
    const spinner = ora({
        hideCursor: true,
        text: 'Installing 🍯 ghata',
    })

    // show the spinner only if auto is disabled
    if (!options.auto && !options.verbose) {
        spinner.start()
    }

    // skip installation if there is an existing installation
    // of ghata is found, unless --force flag is used
    const skipped = await skip(answers.config, options.force)
    if (skipped == true) {
        if (!options.auto && !options.verbose) {
            spinner.color = 'yellow'
            spinner.stopAndPersist({
                text: chalk.yellowBright('Already installed'),
                symbol: chalk.yellowBright(symbols.warning),
            })
        } else {
            logger.warning(`An existing installation detected. Skipped.`)
        }

        // exit the process here
        process.exit(0)
    }

    // add ghata's required dependencies to the latest version
    // of Ghost, we will not await this, because here we can be async
    // and continue to do other stuff as the installation
    // can take a few seconds
    spinner.text = 'Adding dependencies to 👻 Ghost'
    await dependencies(answers.installation)

    // now install ghata itself as a dependency to Ghost
    spinner.text = 'Installing 🍯 ghata to 👻 Ghost'
    await install(answers.installation)

    // now create a symbolic link of the adapter directory
    // from Ghost's node_modules to where Ghost looks for third-party
    // adapters
    spinner.text = 'Linking the 🔌 adapter'
    await link(answers.installation)

    // at this point ghata is installed on Ghost
    // we just need to tell Ghost use ghata
    spinner.text = 'Configuring 👻 Ghost to use 🍯 ghata'
    await configure(answers.installation, answers.config, answers.data)

    // because installing our packages into Ghost seems to break dependencies
    // 🤷 we will run "npm i" once again, to restore them
    // spinner.text = `Reinstalling 👻 Ghost's dependencies`
    // await restore(answers.installation)

    // restart Ghost using the CLI unless we are in auto mode
    // or restarting is skipped by the user
    spinner.text = `Restarting 👻 Ghost`
    await restart(options.auto, options['skip-restart'])

    // tell the user we have finished installation process
    if (!options.auto && !options.verbose) {
        spinner.color = 'green'
        spinner.stopAndPersist({
            text: chalk.greenBright('Finished installing 🍯 ghata'),
            symbol: chalk.greenBright(symbols.success),
        })
    } else {
        logger.success(
            'Finished 💿 installing 🍯 ghata storage 🔌 adapter for 👻 Ghost',
        )
    }
}
