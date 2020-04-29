// This file will validate the inputs provided by the user
// during the interactive installation process

import path from 'path'
import { existsSync as exists, promises as fs } from 'fs'
import { forEach } from '../../../../utilities/loops'

export async function vPath(input: string): Promise<boolean | string> {
    // resolve the path, in case it is relative
    const resolved = path.resolve(input)

    // check if the path exists
    if (!exists(resolved))
        return "The provided path doesn't exist or is invalid."

    // check if the given path is a directory
    if (!(await (await fs.lstat(resolved)).isDirectory()))
        return "The provided path isn't a directory"

    // an array containing all the directories/files in a ghost installation
    const containing = ['content', 'versions', 'current']

    // loop through all elements of containing and check if they exist
    const error = await forEach(containing, file => {
        const filePath = path.join(resolved, file)
        if (!exists(filePath))
            return "The provided path isn't a Ghost installation one."
    })
    if (error) return error

    // if the code hits the next line, that means there were no errors
    // and the path provided by the user is totally valid
    return true
}

export async function vSpacePath(input: string): Promise<boolean | string> {
    const absolute = path.isAbsolute(input)
    if (absolute) return 'Absolute paths are not valid.'

    return true
}
