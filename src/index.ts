import config from './config'
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { authenticate, VerifiedUser } from "./utils";

const gateway = new ApolloGateway({
    serviceList: config.services,
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                // @ts-ignore
                if(context.user){
                    // @ts-ignore
                    let { _id, email, username, issuedAt } = context.user
                    request.http.headers.set('user-id', _id)
                    request.http.headers.set('user-email', email)
                    request.http.headers.set('user-username', username)
                    request.http.headers.set('user-issuedat', issuedAt)
                }
            },
        });
    }
})

const server = new ApolloServer({
    gateway,
    context: ({req}) => {
        const token = req.headers.authorization || null;
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