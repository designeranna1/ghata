"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = [
    {
        name: 'auto',
        description: 'Silent and non-interactive installation.',
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
];
exports.default = options;
