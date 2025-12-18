/*import { getPayload } from "payload"
import configPromise from "@payload-config"*/

import { Where } from "payload";
import { stringify } from "qs-esm"

export async function verifyToken(tokenValue: string) : Promise<{ hash: string, expiresAt: number, user: any } | null>
{
    const query: Where = {
        'token.hash': {
            equals: tokenValue
        }
    }

    try
    {
        const stringifiedQuery = stringify({ where : query }, { addQueryPrefix: true});

        console.log(`/api/users${stringifiedQuery}`)

        const decoded = await fetch(`http://localhost:3000/api/users${stringifiedQuery}`)
        const data = await decoded.json();

        if(!data.docs[0]) return null;

        const user = data.docs[0];

        return { hash: user.token.hash, expiresAt: user.token.expiresAt, user: user };
    }catch(error)
    {
        //console.error("Error verifying token : ", error);
        return null;
    }
}