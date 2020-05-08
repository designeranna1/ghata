/*
 *  After adding ghata as a dependency to Ghost it will be in
 *  node_modules directory. Now, we will symbolic link the adapter directory to
 *  Ghost's core/server/adapters/storage so, that Ghost can use ghata as the storage adapter.
 *  Created On 08 May 2020
 */

import fs from 'fs'
import path from 'path'

import logger from '../logger'

export default async function linkAdapter(ghostPath: string): Promise<void> {
    const adapterIsIn = path.join(
        ghostPath,
        'node_modules',
        'ghata',
        'dist',
        'adapter',
    )

    const toBeInstalledIn = path.join(
        ghostPath,
        'core',
        'server',
        'adapters',
        'storage',
        'ghata',
    )

    logger.verbose(
        `Linking adapter from "${adapterIsIn}" to "${toBeInstalledIn}".`,
    )

    try {
        await fs.promises.symlink(adapterIsIn, toBeInstalledIn)
    } catch (e) {
        if (e.message.startsWith('EEXIST')) {
            await fs.promises.unlink(toBeInstalledIn)
            await fs.promises.symlink(adapterIsIn, toBeInstalledIn)
        } else {
            logger.warning(`Failed to link adapter "${e.message}"`)
        }
    }
}
