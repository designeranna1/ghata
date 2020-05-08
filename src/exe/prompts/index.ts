/*
 *  Returns the AnswersImpl object depending on whether auto mode is set or not.
 *  Takes values from environment variables, when auto mode is set.
 *  Created On 06 May 2020
 */

import { AnswersImpl, ParsedArgsImpl } from '../interfaces'
import ask from './ask'

export default async function load(
    options: ParsedArgsImpl,
): Promise<AnswersImpl> {
    if (options.auto) {
        return {
            data: null,
            installation: null,
            config: null,
        }
    } else {
        // interactively, ask the user
        // the required data to install and configure
        // ghata storage module for Ghost
        return await ask()
    }
}

// if a subdomain string was given, simply returns that
// or constructs the subdomain automatically by taking
// endpoint and bucket
export function makeSubdomain(
    subdomain: string,
    endpoint: string,
    bucket: string,
): string {
    if (subdomain) {
        return subdomain
    } else {
        return bucket + '.' + endpoint
    }
}
