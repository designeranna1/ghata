// This file prompts the user for some questions in order to
// install the project across all Ghost instances

import path from 'path'

import { sync as glob } from 'glob'
import inquirer from 'inquirer'

import { vPath, vSpacePath } from './validation'
import { forEach } from '../utilities/loops'

export interface Answers {
    path: string
    config: string
    endpoint: string
    bucketName: string
    spacePath: string
    subdomain: string
    spaceKey: string
    secretKey: string
}

export default async function ask(): Promise<Answers> {
    // ask the user where Ghost is installed
    const installPath = await inquirer.prompt({
        name: 'value',
        type: 'input',
        validate: vPath,
        message: 'What is the path of Ghost installation?',
    })

    // prepare the variables that will help us show all
    // the JSON files for selection
    const configGlob = path.join(path.resolve(installPath.value), '*.json')
    const configFiles = []

    // loop through all the json files
    await forEach(glob(configGlob), (jsonFile: string) => {
        configFiles.push({
            name: path.basename(jsonFile),
            value: jsonFile,
        })
    })

    // ask the user what is the config file
    const configFile = await inquirer.prompt({
        name: 'value',
        type: 'list',
        message: 'In which config file should ghata be installed?',
        choices: configFiles,
    })

    // as the user any additional question
    const additionalAnswers = await inquirer.prompt([
        {
            name: 'endpoint',
            type: 'input',
            message: 'What is the endpoint of the Digital Ocean Space?',
        },
        {
            name: 'bucketName',
            type: 'input',
            message: 'What is the unique name of the Space?',
        },
        {
            name: 'spacePath',
            type: 'input',
            validate: vSpacePath,
            message: 'Where would you like to store data on the Space?',
        },
        {
            name: 'hasSubdomain',
            type: 'confirm',
            message: 'Does this Space have a subdomain?',
        },
        {
            name: 'subdomain',
            type: 'input',
            when: (prev): boolean => prev.hasSubdomain,
            message: 'What is the subdomain of this Space?',
        },
        {
            name: 'apiKey',
            type: 'input',
            message: 'What is the Spaces key from Digital Ocean?',
        },
        {
            name: 'secretKey',
            type: 'password',
            message: 'What is the secret Spaces key from Digital Ocean?',
        },
    ])

    // prepare the object which can returned
    const returnable: Answers = {
        path: installPath.value as string,
        config: configFile.value as string,
        endpoint: additionalAnswers.endpoint,
        bucketName: additionalAnswers.bucketName,
        spacePath: additionalAnswers.spacePath,
        subdomain:
            additionalAnswers.hasSubdomain == true
                ? additionalAnswers.subdomain
                : `${additionalAnswers.bucketName}.${additionalAnswers.endpoint}`,
        spaceKey: additionalAnswers.apiKey,
        secretKey: additionalAnswers.secretKey,
    }

    // finally, return it!
    return returnable
}
