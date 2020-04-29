// This file will configure all the commands and options
// to be used with cli executable

import path from 'path'

import sade from 'sade'

import logger from '../logger'
import install from './install/index'

const app = sade('ghata')
const packageInfo = require(path.join(
    __dirname,
    '..',
    '..',
    '..',
    'package.json',
))

export default async function parse(): Promise<void> {
    app.version(packageInfo.version)
    app.describe((packageInfo.description as string).substring(8))

    // define a few examples
    app.example('install --auto')

    // configure all the commands
    app.command(
        'install',
        'Installs storage adapter on all supported versions of Ghost',
    )
        .option(
            '--auto',
            'Use environment variables instead of interactive prompts',
        )
        .action(install)

    app.parse(process.argv, {
        unknown: arg => logger.error(`Unknown argument "${arg}".`, 3),
    })
}
