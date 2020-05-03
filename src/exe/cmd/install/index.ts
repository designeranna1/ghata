// This file installs ghata depending on the auto mode

import ask, { Answers } from './prompts'
import autoLoad from './auto/index'
import installTask from './install'

export default async function install(options: any): Promise<void> {
    const auto: boolean = options.auto
    const exec: string = options.exec
    let installData: Answers

    // ask the user with prompts or take from environment
    // variables depending on the mode
    if (!auto) {
        installData = await ask()
    } else {
        installData = await autoLoad()
    }

    // install the ghata storage module
    await installTask(installData, auto, exec)
}
