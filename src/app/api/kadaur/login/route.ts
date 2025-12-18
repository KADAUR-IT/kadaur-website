import { getPayload, jwtSign } from "payload";
import configPromise from "@/payload.config";
import { NextResponse } from "next/server";
import { signToken } from "@/utils/auth/signToken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const payload = await getPayload({ config: configPromise})
        
        const result = await payload.login({
            collection: "users",
            data: { email, password },
        })

        const user = result.user;

        const token = await signToken({ id: user.id, email: user.email , userAgent: req.headers.get("user-agent")}, 2 * 60 * 60);

        if(!token) {
            
            return Response.json({error: "Erreur lors de la génération du token" }, {status: 500})
        }

        
       const response = NextResponse.json({
            status: 200,
            message: "Connexion réussie",
            user,
            customToken: token.hash
        })

        response.cookies.set('kadaur-token', token.hash, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
        })

        return response
    } catch(error)
    {
        return Response.json({error: "Email ou mot de passe incorrect" }, {status: 401})
    }
}