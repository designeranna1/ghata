/*
 *  This file will install ghata to a specified Ghost installation.
 *  Created On 06 May 2020
 */

import ora from 'ora'
import chalk from 'chalk'

import { AnswersImpl, ParsedArgsImpl } from '../interfaces'
import logger from '../logger'
import dependencies from './dependencies'
import install from './install'
import link from './link'
import configure from './configure'
import restore from './restore'

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
    spinner.text = `Reinstalling 👻 Ghost's dependencies`
    await restore(answers.installation)

    // tell the user we have finished installation process
    if (!options.auto && !options.verbose) {
        spinner.stopAndPersist({
            text: 'Finished installing 🍯 ghata',
            symbol: chalk.greenBright.bold('✓'),
        })
    } else {
        logger.success(
            'Finished 💿 installing 🍯 ghata storage 🔌 adapter for 👻 Ghost',
        )
    }
}
