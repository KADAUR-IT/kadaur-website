import { NextResponse } from "next/server"
import { getPayload } from "payload";
import configPromise from "@payload-config"
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth/verifyToken";

export async function GET(req: Request) {
    const payload = await getPayload( {config: configPromise} );
    const cookieStore = await cookies();
    const token = cookieStore.get("kadaur-token")?.value;

    if(!token)
    {
        return NextResponse.json({ user : null, error: "Non connecté" }, { status: 401});
    }

    try {
        const decoded = await verifyToken(token)

        if(!decoded)
        {
            return NextResponse.json({ user : null, error: "Token invalide" }, { status: 401});
        }

        //console.log(userUpdated)

        const response = NextResponse.json({
            status: 200,
            message: "Déconnexion réussie",
        })
        response.cookies.delete('kadaur-token')
        return response
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error)
        return NextResponse.json({error: "Erreur lors de la déconnexion" }, {status: 500})
    }
}