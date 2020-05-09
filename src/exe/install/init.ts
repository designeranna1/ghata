/*
 *  In a Docker container, if the content directory is empty. This will
 *  copy from content.orig to content.
 *  Created On 09 May 2020
 */

import path from 'path'
import { promises as fs } from 'fs'

import del from 'del'
import copy from 'copy-dir'

import logger from '../logger'

export default async function initializeGhost(
    ghostPath: string,
    auto: boolean,
): Promise<void> {
    // simply return if we are not in auto mode
    if (!auto) return

    // the content directory path and the content.orig path
    const contentPath = path.join(ghostPath, '..', 'content')
    const contentOrigPath = path.join(ghostPath, '..', 'content.orig')

    // check if the content directory has files in it.
    const files = await (await fs.readdir(contentPath)).length

    // if content directory is empty initialize it!
    if (files < 1) {
        logger.verbose(`Initializing Ghost's content directory`)

        // delete the content/ directory
        await del(contentPath)

        // copy the content.org/ into content/
        await copy(contentOrigPath, contentPath, {
            utimes: true,
            mode: true,
            cover: true,
        })
    }
}
