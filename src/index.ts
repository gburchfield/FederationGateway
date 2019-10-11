import dotenv from 'dotenv'
import {GatewayNodeConfig} from "socialbrokernode/dist/lib/Types";
import {SocialBrokerNode} from "socialbrokernode/dist/lib/SocialBrokerNode";
dotenv.config()


const gatewayConfig: GatewayNodeConfig = {
    port: process.env.PORT,
    secret: process.env.SECRET_KEY,
    services: [
        {
            name: "Authentication",
            url: "http://authentication_service:4001/graphql"
        },
        {
            name: "Profile",
            url: "http://profile_service:4002/graphql"
        }
    ]
};

const MySocialBrokerGateway: SocialBrokerNode = new SocialBrokerNode(gatewayConfig);

MySocialBrokerGateway.start();