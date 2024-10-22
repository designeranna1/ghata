// This file will configure all the commands and options
// to be used with cli executable

import path from 'path'

import commandLineArgs from 'command-line-args'

import options from './options'
import help from './options/help'
import version from './options/version'
import { ParsedArgsImpl } from '../interfaces'
import logger from '../logger'

const appData = require(path.join(__dirname, '..', '..', '..', 'package.json'))

export default async function parse(): Promise<ParsedArgsImpl> {
    let parsed
    try {
        parsed = commandLineArgs(options)
    } catch (e) {
        if (e.name == 'UNKNOWN_VALUE') {
            logger.error(`Unrecognized value "${e.value}" was passed.`, 3)
        } else if (e.name == 'UNKNOWN_OPTION') {
            logger.error(`Unrecognized option "${e.optionName}" was passed.`, 3)
        } else {
            logger.error(e, 3)
        }
    }

    // handle the help flag
    if (parsed['help']) {
        await help()
    }

    // handle the --version flag
    if (parsed['version']) {
        await version(appData)
    }

    // return the parsed options
    return parsed as ParsedArgsImpl
}
