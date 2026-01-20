"use client"

import { useState, useEffect } from "react"
import { hasCookie, getCookie } from "cookies-next"
import Script from "next/script";

interface GoogleAnalyticsScriptProps {
    googleAnalyticsID: string | undefined;
}

export default function GoogleAnalyticsScript({ googleAnalyticsID }: GoogleAnalyticsScriptProps) {
    if(!googleAnalyticsID) return null;

    const [isAccepted, setIsAccepted] = useState(false);

    useEffect( () => {
        if( hasCookie("kadaur_cookie_consent") && getCookie("kadaur_cookie_consent") === "true") {
            setIsAccepted(true);
        }
    }, [])

    if(!isAccepted) return null;

    return (
        <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsID}', { page_path: window.location.pathname });
              console.log(window.location.pathname)
            `,
          }}
        />
        </>
    )
}