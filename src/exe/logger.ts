// This file will use itivrutaha, as the logging system
// and configure it and export it.

import itivrutaha from 'itivrutaha'

export default itivrutaha.createNewLogger({
    theme: ':type :message',
    verboseIdentifier: ['-v', '--verbose'],
})
