/*
 *  This file will ask the user some prompts and return their response.
 *  Created On 06 May 2020
 */

import path from 'path'

import inquirer from 'inquirer'
import { sync as glob } from 'glob'

import { AnswersImpl } from '../interfaces'
import { vPath, vSpacePath } from './validation'
import { forEach } from '../../utilities/loops'
import { makeSubdomain } from '.'

export default async function ask(): Promise<AnswersImpl> {
    // ask the user where Ghost is installed
    const ghostPath = path.resolve(
        (
            await inquirer.prompt({
                name: 'value',
                type: 'input',
                validate: vPath,
                message: 'What is the path of Ghost installation?',
            })
        ).value,
    )

    // scan for all the JSON files, and ask the user to select one
    // which is the configuration file for Ghost
    const configGlob = path.join(ghostPath, '*.json')
    const configFiles = []
    await forEach(glob(configGlob), (jsonFile: string) => {
        configFiles.push({
            name: path.basename(jsonFile),
            value: jsonFile,
        })
    })
    const data = await inquirer.prompt([
        {
            name: 'config',
            type: 'list',
            message: 'In which config file should ghata be installed?',
            choices: configFiles,
        },
        {
            name: 'endpoint',
            type: 'input',
            message: 'What is the endpoint of the Digital Ocean Space?',
        },
        {
            name: 'bucket',
            type: 'input',
            message: 'What is the unique name of the Space?',
        },
        {
            name: 'path',
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
            name: 'key',
            type: 'input',
            message: 'What is the Spaces key from Digital Ocean?',
        },
        {
            name: 'secret',
            type: 'password',
            message: 'What is the secret Spaces key from Digital Ocean?',
        },
    ])

    // return the answers from the users
    return {
        installation: path.join(ghostPath, 'current'),
        config: data.config,
        data: {
            subdomain: makeSubdomain(
                data.subdomain,
                data.endpoint,
                data.bucket,
            ),
            endpoint: data.endpoint,
            bucket: data.bucket,
            path: data.path,
            key: data.key,
            secret: data.secret,
        },
    }
}
