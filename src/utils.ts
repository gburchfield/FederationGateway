import config from './config'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

export const authenticate = (token:string) => {
    if(token){
        try {
            let issued = new Date(0)
            let verifiedToken: any = jwt.verify(token,config.secret)
            issued.setUTCSeconds(verifiedToken.iat)
            let user: VerifiedUser = {
                _id: verifiedToken._id,
                email: verifiedToken.email,
                username: verifiedToken.username,
                roles: verifiedToken.roles,
                issuedAt: issued
            }
            return user
        } catch (e) {
            throw new AuthenticationError("Not Authorized or Token Expired")
        }
    } else {
        return null
    }
}

export interface VerifiedUser {
    _id: string,
    email: string,
    username: string,
    roles: [string],
    issuedAt?: Date
}