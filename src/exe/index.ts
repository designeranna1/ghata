#!/usr/bin/env node
//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/ghata.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Executable entryfile for ghata project
//                       |

import ask from './prompts'
import install from './install'

async function main(): Promise<void> {
    const answers = await ask()
    await install(answers.path)
}

main()
