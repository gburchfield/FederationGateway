
const environment = process.env.NODE_ENV || 'dev'

let config: ConfigParent = {
    dev: {
        port: 8080,
        secret:"development_secret",
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
        port: 8080,
        secret: process.env.SECRET_KEY,
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
    secret: string
    services: Array<Service>
}

interface Service {
    name: string,
    url: string
}