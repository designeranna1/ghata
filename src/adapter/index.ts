// This is the actual Ghost adapter for ghata project
// which inherits from Ghost's default base adapter

import AWS from 'aws-sdk'
import StorageBase from 'ghost-storage-base'

import { OptionsImpl, FileInfoImpl } from './interfaces'
import saveFile from './save'

module.exports = class Ghata extends StorageBase {
    private options: OptionsImpl
    private s3: AWS.S3

    constructor(options: any) {
        super(options)
        this.options = options

        this.s3 = new AWS.S3({
            endpoint: options.endpoint,
            accessKeyId: options.key,
            secretAccessKey: options.secret,
            sslEnabled: true,
        })
    }

    // This will save the image on to Digital Ocean Spaces
    // and then return a publicly accessible URL to
    // Ghost's admin page
    async save(file: FileInfoImpl): Promise<string> {
        return await saveFile(this.s3, this.options, file)
    }

    // This function is left intensionally empty.
    serve() {
        return function (req, res, next): any {
            next()
        }
    }

    async exists(): Promise<boolean> {
        return false
    }

    async delete(): Promise<void> {
        return Promise.reject('not implemented')
    }

    async read(): Promise<void> {
        true
    }
}
