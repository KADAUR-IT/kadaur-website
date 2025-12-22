import React from 'react'
import './styles.css'
import 'src/styles/global.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Script from 'next/script'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { ToastContainer } from "react-toastify"

const payload = await getPayload({ config: payloadConfig})
const siteMetadata = await payload.findGlobal({
  slug: "settings"
})

export const metadata = {
  description: siteMetadata.SEO.description || 'A blank template using Payload in a Next.js app.',
  title: {
    template: siteMetadata.SEO.template || "KADAUR - %s",
    default : siteMetadata.SEO.title || 'KADAUR',
  }
}

const GA_MEASUREMENT_ID = siteMetadata.googleAnalytics?.trackingID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
              console.log(window.location.pathname)
            `,
          }}
        />
      </head>
      <body>
        <main>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </main>
      </body>
    </html>
  )
}
