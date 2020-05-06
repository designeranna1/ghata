import chalk from 'chalk'
import emoji from 'node-emoji'
import usage from 'command-line-usage'

import options from './index'

const sections = [
    {
        content: `:honey_pot: ${chalk.bold.whiteBright(
            'ghata',
        )} is a :amphora: storage :electric_plug: adapter written\n for :ghost: Ghost to store :file_folder: assets in a :ocean: Digital Ocean :milky_way: Space.`,
    },
    {
        optionList: options,
    },
    {
        content: `${chalk.bold.whiteBright(
            'Project home',
        )} https://github.com/vasanthdeveloper/ghata\nDeveloped, designed and maintained by ${chalk.bold.whiteBright(
            'Vasanth Developer',
        )}.\nA software released in :sparkling_heart: and open source.`,
    },
]

export default async function help(): Promise<void> {
    console.log(emoji.emojify(usage(sections)))
    process.exit(0)
}
