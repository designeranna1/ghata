#!/usr/bin/env node
//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/ghata.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Executable entryfile for ghata project
//                       |

import app from './cli/index'
import getAnswers from './prompts/index'
import install from './install/index'

async function main(): Promise<void> {
    // parse the command line arguments
    const args = await app()

    // get all the required information from either asking
    // the user, or by picking up from environment variables
    const answers = await getAnswers(args)

    // start the installation process
    await install(answers, args)
}

main()
