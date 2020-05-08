// This file contains all passable options to ghata

const options = [
    {
        name: 'auto',
        description: 'Silent and non-interactive installation.',
        type: Boolean,
    },
    {
        name: 'force',
        description: 'Continue to install even if already installed.',
        type: Boolean,
    },
    {
        name: 'skip-restart',
        alias: 'r',
        description: 'Do not restart Ghost. Ignored in auto mode.',
        type: Boolean,
    },
    {
        name: 'verbose',
        alias: 'v',
        description: 'Show additional information.',
        type: Boolean,
    },
    {
        name: 'version',
        alias: 'V',
        description: 'Show version information and terminate.',
        type: Boolean,
    },
    {
        name: 'help',
        alias: 'h',
        description: 'Show this help information and terminate.',
        type: Boolean,
    },
]

export default options
