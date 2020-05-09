/*
 *  Restart Ghost in interactive mode using the Ghost-CLI.
 *  Created On 08 May 2020
 */

import exec from 'execa'

import logger from '../logger'

export default async function restart(
    auto: boolean,
    skip: boolean,
): Promise<void> {
    if (!auto && !skip) {
        logger.verbose('Restarting Ghost')
        await exec('ghost', ['restart'])
    }
}
