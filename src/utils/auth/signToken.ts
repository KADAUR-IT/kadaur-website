import crypto from "node:crypto"
import { getPayload } from "payload"
import configPromise from "@/payload.config"


const payload = await getPayload({ config: configPromise })


const generateToken = (tokenInfo : object) : { salt : Buffer, hash : string } => {
    const salt = crypto.randomBytes(16)
    const hash = crypto.createHmac("sha512", salt).update(JSON.stringify(tokenInfo)).digest('hex');

    return { salt, hash }
}

export async function signToken(tokenInfo : object, ttl = 3600) : Promise<{hash: string, expiresAt: number} | null>
{
    const { salt, hash } = generateToken(tokenInfo);
    const expiresAt = Date.now() + ttl * 1000;

    try
    {

        return { hash, expiresAt }
    } catch(error)
    {
        console.error("Error updating user token :", error);
        return null
    }
}