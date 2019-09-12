import config from './config'
import { Service } from "./config";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { authenticate, VerifiedUser } from "./utils";

const buildServicesList = () => {
    let servicesList: Array<Service> = []
    let services_string_array = config.services_string.split(" ")
    services_string_array.forEach(service => {
        let service_array = service.split("::")
        servicesList.push({
            name: service_array[0],
            url: service_array[1]
        })
    })
    console.log(servicesList)
    return servicesList
}

const gateway = new ApolloGateway({
    serviceList: buildServicesList(),
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                // @ts-ignore
                if(context.user){
                    // @ts-ignore
                    request.http.headers.set('user', JSON.stringify(context.user))
                    // @ts-ignore
                    // let { _id, email, username, issuedAt } = context.user
                    // request.http.headers.set('user-id', _id)
                    // request.http.headers.set('user-email', email)
                    // request.http.headers.set('user-username', username)
                    // request.http.headers.set('user-issuedat', issuedAt)
                }
            },
        });
    },
    introspectionHeaders: {
        'introspection': 'true'
    }
})

const server = new ApolloServer({
    gateway,
    context: ({req}) => {
        const token = (req.headers.authorization !== null && req.headers.authorization !== 'null') ? req.headers.authorization : null;
        const user = authenticate(token)
        return { user }
    },
    subscriptions: false
})

const app = express()
server.applyMiddleware({app})

app.listen({ port: config.port }, () =>
    console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);

