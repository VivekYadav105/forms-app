import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload extends JWTPayload{
    userId:string,
    expiresAt:Date
}

export async function encrypt(payload:SessionPayload){    
    return new SignJWT(payload)
                .setProtectedHeader({alg:"HS256"})
                .setIssuedAt()
                .setExpirationTime("7d")
                .sign(encodedKey)
}

export async function decoded(token:string|undefined=''){
    try{
        const {payload} = await jwtVerify(token,encodedKey,{
            algorithms:["HS256"]
        })
        return payload
    }catch(err){
        console.log(err);
    }
}