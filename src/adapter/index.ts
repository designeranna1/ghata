// This is the actual Ghost adapter for ghata project
// which inherits from Ghost's default base adapter

import StorageBase from 'ghost-storage-base'

module.exports = class Ghata extends StorageBase {
    constructor(options: any) {
        console.log(options)
        super(options)
    }

    async save(image: any, targetDir: string): Promise<string> {
        return 'https://static.vasanthdeveloper.com/image.png'
    }

    serve() {
        return function (req, res, next) {
            next()
        }
    }

    async exists(fileName: string, targetDir: string): Promise<boolean> {
        return false
    }

    async delete() {
        return Promise.reject('not implemented')
    }

    async read(options: any): Promise<void> {}
}
