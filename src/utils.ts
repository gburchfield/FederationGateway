import config from './config'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'

export const authenticate = (token:string) => {
    console.log("Here is Token: ", token)
    if(token){
        try {
            let issued = new Date(0)
            let verifiedToken: any = jwt.verify(token,config.secret)
            issued.setUTCSeconds(verifiedToken.iat)
            let user: VerifiedUser = {
                _id: verifiedToken._id,
                email: verifiedToken.email,
                userType: verifiedToken.userType,
                issuedAt: issued
            }
            console.log("Here is User: ", user)
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
    userType: string,
    issuedAt?: Date
}