// This file prompts the user for some questions in order to
// install the project across all Ghost instances

import inquirer from 'inquirer'

import { vPath } from './validation'

interface Answers {
    path: string
}

export default async function ask(): Promise<Answers> {
    // prepare the questions to be asked
    return (await inquirer.prompt([
        {
            name: 'path',
            type: 'input',
            validate: vPath,
            message: 'What is the path of Ghost installation?',
        },
    ])) as Answers
}
