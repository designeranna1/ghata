/*
 *  Checks for new updates and displays a message to notify the user that a new
 *  version has been released.
 *  Created On 08 May 2020
 */

import updateNotifier from 'update-notifier'

export default async function updateCheck(): Promise<void> {
    const appData = require('../../package.json')
    const updater = updateNotifier({
        pkg: appData,
        // updateCheckInterval: 1000 * 60 * 60 * 24,
        updateCheckInterval: 1,
    })

    await updater.fetchInfo()
    updater.notify({
        isGlobal: true,
        defer: false,
        boxenOptions: {
            borderStyle: 'bold',
            borderColor: 'cyanBright',
            align: 'center',
            padding: 1,
            margin: 1,
        },
    })
}
