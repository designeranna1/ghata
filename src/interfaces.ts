export interface OptionsImpl {
    endpoint: string
    subdomain: string
    spacePath: string
    bucket: string
    key: string
    secret: string
}

export interface FileInfoImpl {
    ext: string
    path: string
    size: number
    name: string
    type: string
    encoding: string
    mimetype: string
    filename: string
    fieldname: string
    destination: string
    originalname: string
}
