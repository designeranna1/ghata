// This file will load the required values from environment variables
// for using in Docker containers

import { Answers } from '../prompts'

import logger from '../../../logger'

async function checkIfEnvExist(): Promise<string> {
    if (!process.env.GHATA_CONFIG) return 'GHATA_CONFIG'
    if (!process.env.GHATA_ENDPOINT) return 'GHATA_ENDPOINT'
    if (!process.env.GHATA_BUCKET) return 'GHATA_BUCKET'
    if (!process.env.GHATA_SPACE_PATH) return 'GHATA_SPACE_PATH'
    if (!process.env.GHATA_KEY) return 'GHATA_KEY'
    if (!process.env.GHATA_SECRET) return 'GHATA_SECRET'
}

export default async function load(): Promise<Answers> {
    // check for environment variables and error if they aren't defined
    const notExist = await checkIfEnvExist()
    if (notExist)
        logger.error(
            `A required environment variable "${notExist}" was not provided.`,
            4,
        )

    // prepare the subdomain
    const subdomain = process.env.GHATA_SUBDOMAIN
        ? process.env.GHATA_SUBDOMAIN
        : `${process.env.GHATA_BUCKET}.${process.env.GHATA_ENDPOINT}`

    // return the gathered data
    return {
        path: process.cwd(),
        config: process.env.GHATA_CONFIG,
        endpoint: process.env.GHATA_ENDPOINT,
        bucketName: process.env.GHATA_BUCKET,
        subdomain,
        spacePath: process.env.GHATA_SPACE_PATH,
        spaceKey: process.env.GHATA_KEY,
        secretKey: process.env.GHATA_SECRET,
    }
}
