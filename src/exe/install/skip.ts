/*
 *  Check if ghata is already installed and skip the installation unless,
 *  force flag is given.
 *  Created On 08 May 2020
 */

import { promises as fs } from 'fs'

export default async function skip(
    configPath: string,
    force: boolean,
): Promise<boolean> {
    // when force is true, we don't even need to read the file
    // and then determine if we need to continue installation
    // just return true!
    if (force) return false

    // read the config file
    const config = JSON.parse(
        (await fs.readFile(configPath, { encoding: 'UTF-8' })) as string,
    )

    // check if the storage config is defined
    const storage = config['storage']
    if (!storage) return false

    // check if the an active storage adapter was set
    const active = storage['active']
    if (!active) return false

    // we won't skip if the active storage adapter
    // isn't ghata
    if (active != 'ghata') {
        return false
    } else {
        return true
    }
}
