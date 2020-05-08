/*
 *  Now, that ghata is fully installed on Ghost we will read the
 *  config file the user specified and configure Ghost to use ghata.
 *  Created On 08 May 2020
 */

import fs from 'fs'

import { ConfigImpl } from '../interfaces'
import logger from '../logger'

export default async function configureGhost(
    ghostPath: string,
    config: string,
    data: ConfigImpl,
): Promise<void> {
    logger.verbose('Configuring Ghost to use ghata')
    logger.verbose(`Writing to ${config}`)

    const configFile = JSON.parse(
        (await fs.promises.readFile(config, {
            encoding: 'UTF-8',
        })) as string,
    )

    configFile['storage'] = {
        active: 'ghata',
        ghata: {
            endpoint: data.endpoint,
            subdomain: data.subdomain,
            spacePath: data.path,
            bucket: data.bucket,
            key: data.key,
            secret: data.secret,
        },
    }

    await fs.promises.writeFile(config, JSON.stringify(configFile, null, 4), {
        encoding: 'UTF-8',
    })
}
