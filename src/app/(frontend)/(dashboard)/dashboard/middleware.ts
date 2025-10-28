import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/utils/auth/verifyToken";

export async function middleware(request: NextRequest)
{
    const token = request.cookies.get('kadaur-token')?.value;

    if(!token)
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const entry = await verifyToken(token);
    if(!entry)
    {
        let response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('kadaur-token');
        return response;
    }

    if(Date.now() > entry.expiresAt)
    {
        let response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('kadaur-token');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
}