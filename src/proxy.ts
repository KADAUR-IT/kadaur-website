import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuthClient } from "@/utils/auth/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest)
{
    return NextResponse.rewrite(new URL('/404', request.url));

    const session = await adminAuthClient.getSession({
        headers: await headers()
    })
    
    //console.log(session)
    if(session.isError)
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const requestHeaders = new Headers(request.headers)
  
    //@ts-ignore
    requestHeaders.set('auth-user', session.data.user.id)

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}

export const config = {
    matcher: ['/dashboard/:path*',
        '/login',
        '/register'
    ],
}