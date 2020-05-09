/*
 *  Reads the required variables from environment variables and
 *  errors out when required environment variables aren't set.
 *  Created On 08 May 2020
 */

import path from 'path'

import chalk from 'chalk'

import { AnswersImpl } from '../interfaces'
import logger from '../logger'
import { makeSubdomain } from '../prompts'
import { vPath } from '../prompts/validation'

// check if a list of required environment variables exist
// or not, if they don't we simply error out and exit the process
async function validateEnvironment(): Promise<string> {
    // list of all the required environment variables
    const variables = ['config', 'endpoint', 'bucket', 'path', 'key', 'secret']

    // the variable we will return after the loop finishes
    let returnable = null

    // the variable that is returned
    variables.forEach((variable: string) => {
        const varString = `GHATA_${variable.toUpperCase()}`

        // when verbose mode is enabled, we log the values
        // except the secret for security reasons
        if (variable == 'secret') {
            logger.verbose(`${varString}  ${chalk.gray('[hidden]')}`)
        } else {
            logger.verbose(
                `${varString}  ${chalk.blueBright(process.env[varString])}`,
            )
        }

        if (!process.env[varString]) {
            returnable = varString
            return
        }
    })

    return returnable
}

export default async function auto(): Promise<AnswersImpl> {
    const exists = await validateEnvironment()
    if (exists)
        logger.error(`Required environment variable "${exists}" not set.`, 4)

    // check if the path is a valid Ghost installation
    const valid = await vPath(process.cwd())
    if (valid != true)
        logger.error(
            `This isn't a Ghost installation directory. Please run this command in the directory where you have installed Ghost.`,
            5,
        )

    // now that we know all the variables are ready for us to return
    // let's return
    return {
        installation: path.join(process.cwd(), 'current'),
        config: process.env.GHATA_CONFIG,
        data: {
            subdomain: makeSubdomain(
                process.env.GHATA_SUBDOMAIN,
                process.env.GHATA_ENDPOINT,
                process.env.GHATA_BUCKET,
            ),
            endpoint: process.env.GHATA_ENDPOINT,
            bucket: process.env.GHATA_BUCKET,
            path: process.env.GHATA_PATH,
            key: process.env.GHATA_KEY,
            secret: process.env.GHATA_SECRET,
        },
    }
}
