/*
 *  Interface skeletons used across this project.
 *  Created On 06 May 2020
 */

// skeleton for storing config in Ghost's config.json
export interface ConfigImpl {
    subdomain: string
    endpoint: string
    bucket: string
    path: string
    key: string
    secret: string
}

// skeleton for user's answers for prompts
export interface AnswersImpl {
    installation: string
    data: ConfigImpl
    config: string
}

// skeleton for parsed command line arguments
export interface ParsedArgsImpl {
    auto: boolean
    verbose: boolean
}
