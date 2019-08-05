
const environment = process.env.NODE_ENV || 'dev'

let config: ConfigParent = {
    dev: {
        port: parseInt(process.env.PORT),
        secret:process.env.SECRET_KEY,
        services_string: process.env.SERVICES_STRING,
        services: [
            {
                name: "Authentication",
                url: "http://localhost:4001/graphql"
            },
            {
                name: "Profile",
                url: "http://localhost:4002/graphql"
            }
        ]
    },
    prod: {
        port: parseInt(process.env.PORT),
        secret: process.env.SECRET_KEY,
        services_string: process.env.SERVICES_STRING,
        services: [
            {
                name: "Authentication",
                url: "http://localhost:4001/graphql"
            },
            {
                name: "Profile",
                url: "http://localhost:4002/graphql"
            }
        ]
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
    services: Array<Service>
}

export interface Service {
    name: string,
    url: string
}