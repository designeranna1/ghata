/*
 *  For some reason, npm removes other dependencies when we add ours
 *  🤷, I don't know why. So, we have to re-install all the dependencies again.
 *  Created On 08 May 2020
 */

import exec from 'execa'

import logger from '../logger'

export default async function restoreDependencies(
    ghostPath: string,
): Promise<void> {
    logger.verbose(`Reinstalling Ghost's dependencies`)
    await exec('npm', ['install'], {
        cwd: ghostPath,
    })
}
