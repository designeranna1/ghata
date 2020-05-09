/*
 *  read the dependencies from our devDependencies and add the required
 *  ones for the adapter to Ghost and add them for the same version.
 *  Created On 08 May 2020
 */

import exec from 'execa'

import logger from '../logger'
import dependencies from '../../adapter/dependencies'

export default async function addDependencies(
    ghostPath: string,
): Promise<void> {
    logger.verbose('Installing dependencies required for ghata')
    const deps = require('../../../package.json').devDependencies
    const depsToInstall: string[] = []

    // loop through the dependencies specified in dependencies
    dependencies.forEach((dep: string) => {
        const version = deps[dep].replace(/[^0-9a-zA-Z.]/g, '')
        depsToInstall.push(`${dep}@${version}`)
    })

    await exec('yarn', ['add', depsToInstall.join(' ')], {
        cwd: ghostPath,
    })
}
