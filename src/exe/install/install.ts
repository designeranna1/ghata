/*
 *  Add ghata itself as a dependency because npx deletes the adapter
 *  once we finish this process, to make things persistent we will install
 *  ghata as a dependency to Ghost.
 *  Created On 08 May 2020
 */

import exec from 'execa'

import logger from '../logger'

export default async function installGhata(ghostPath: string): Promise<void> {
    logger.verbose('Installing ghata as a dependency to Ghost')
    const version = require('../../../package.json').version

    await exec('npm', ['install', `ghata@${version}`], {
        cwd: ghostPath,
    })

    logger.verbose('Done installing ghata as a dependency to Ghost')
}
