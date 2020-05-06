// This file will display the version information and terminate the process

import chalk from 'chalk'
import emoji from 'node-emoji'

export default async function version(appData): Promise<void> {
    console.log(
        emoji.emojify(
            `:honey_pot: ${chalk.bold.whiteBright('ghata')} v${
                appData.version
            }`,
        ),
    )
    console.log(
        `${chalk.bold(
            'Project home',
        )} https://github.com/vasanthdeveloper/ghata`,
    )
    console.log(
        `Developed, designed and maintained by ${chalk.bold.whiteBright(
            'Vasanth Developer',
        )}.`,
    )
    console.log(
        emoji.emojify(
            `A software released in :sparkling_heart: and open source.`,
        ),
    )

    // terminate the process
    process.exit(0)
}
