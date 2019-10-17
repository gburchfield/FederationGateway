import dotenv from 'dotenv'
import {GatewayNodeConfig} from "socialbrokernode/dist/lib/Types";
import {GatewayNode} from "socialbrokernode";
import {ServiceEndpointDefinition} from "@apollo/gateway";
dotenv.config()

const getServices: () => ServiceEndpointDefinition[] = () => {
    let services: ServiceEndpointDefinition[] = []
    let serviceStr = process.env.SERVICES_STRING
    let serviceArr = serviceStr.split(";")

    serviceArr.forEach((item) => {
        let item_arr = item.split(":")
        let service = {
            name: item_arr[0],
            url: `http://${item_arr[1]}:${item_arr[2]}/graphql`
        }
        services.push(service)
    })

    return services
}


const gatewayConfig: GatewayNodeConfig = {
    port: process.env.PORT,
    secret: process.env.SECRET_KEY,
    services: getServices()
};

const MySocialBrokerGateway: GatewayNode = new GatewayNode(gatewayConfig);
MySocialBrokerGateway.buildGatewayServer()
MySocialBrokerGateway.start();