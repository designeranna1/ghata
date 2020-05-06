// This file will configure all the commands and options
// to be used with cli executable

import path from 'path'

import commandLineArgs from 'command-line-args'

import options from './options'
import help from './options/help'
import version from './options/version'
import logger from '../logger'

const appData = require(path.join(__dirname, '..', '..', '..', 'package.json'))

export default async function parse(): Promise<any> {
    const parsed = commandLineArgs(options)

    // handle the help flag
    if (parsed['help']) {
        await help()
    }

    // handle the --version flag
    if (parsed['version']) {
        await version(appData)
    }

    // return the parsed options
    return parsed
}
