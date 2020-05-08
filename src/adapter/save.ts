// This file saves a provided file into Digital Ocean spaces

import fs from 'fs'
import path from 'path'

import AWS from 'aws-sdk'
import moment from 'moment'

import { OptionsImpl, FileInfoImpl } from './interfaces'

// This function wraps the s3.upload() into a promise
// because for some wired reason, 🤷 the s3.upload().promise()
// never resolves
function upload(params: AWS.S3.PutObjectRequest, s3: AWS.S3): Promise<any> {
    return new Promise((resolve, reject) => {
        s3.upload(params, {}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default async function save(
    s3: AWS.S3,
    options: OptionsImpl,
    file: FileInfoImpl,
): Promise<string> {
    // construct the file path where this image will be
    // stored in the Digital Ocean space
    const filePath = path.join(
        options.spacePath,
        moment().format('YYYY'),
        moment().format('MMMM'),
        moment().format('Do'),
        file.originalname,
    )

    // read the file and save as a Buffer
    const fileData = fs.readFileSync(file.path)

    // upload the file
    await upload(
        {
            Body: fileData,
            Bucket: options.bucket,
            Key: filePath,
            ContentType: file.mimetype,
            // ContentEncoding: file.encoding,
            // ContentLength: file.size,
            ACL: 'public-read',
        },
        s3,
    )

    // now, that we know the file was uploaded
    // construct the file's HTTPS access URL and return
    // so, Ghost can embed this in frontend
    return `https://${options.subdomain}/${filePath}`
}
