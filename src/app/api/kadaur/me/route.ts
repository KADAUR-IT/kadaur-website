import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {  getPayload } from "payload";
import configPromise from "@payload-config"
import { verifyToken } from "@/utils/auth/verifyToken";

export async function GET()
{
    const payload = await getPayload( {config: configPromise} );
    const cookieStore = await cookies();
    const token = cookieStore.get("kadaur-token")?.value;

    if(!token)
    {
        return NextResponse.json({ user : null, error: "Non connecté" }, { status: 401});
    }

    try{
        const decoded = await verifyToken(token)

        if(!decoded)
        {
            return NextResponse.json({ user : null, error: "Token invalide" }, { status: 401});
        }

        const user = decoded.user;

        return NextResponse.json({ user}, { status: 200});
    }catch(error)
    {
        console.error("Error verifying token:", error);
        
        return NextResponse.json({ user : null, error: "Token invalide" }, { status: 401});
    }
}