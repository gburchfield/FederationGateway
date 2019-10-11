import dotenv from 'dotenv'
dotenv.config()

const environment = process.env.NODE_ENV || 'dev'

let config: ConfigParent = {
    dev: {
        port: parseInt(process.env.PORT),
        secret:process.env.SECRET_KEY,
        services_string: process.env.SERVICES_STRING
    },
    prod: {
        port: parseInt(process.env.PORT),
        secret: process.env.SECRET_KEY,
        services_string: process.env.SERVICES_STRING
    }
}

let exportConfig: Config = config[environment]

export default exportConfig

interface ConfigParent {
    [key:string]: Config
}

interface Config {
    port: number,
    secret: string,
    services_string: string,
}

export interface Service {
    name: string,
    url: string
}