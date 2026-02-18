import React from 'react'
import './styles.css'
import 'src/styles/global.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Script from 'next/script'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { ToastContainer } from "react-toastify"
import GoogleAnalyticsScript from '@/components/scripts/googleAnalyticsScript'
import CookieBanner from '@/components/ui/Cookies/CookieBanner'

const payload = await getPayload({ config: payloadConfig})
const siteMetadata = await payload.findGlobal({
  slug: "settings"
})

export const metadata = {
  description: siteMetadata.SEO.description || 'KADAUR - Cabinet de conseil en gestion de projets IT et transformation digitale.',
  title: {
    template: siteMetadata.SEO.template || "KADAUR - %s",
    default : siteMetadata.SEO.title || 'KADAUR',
  },
  icons: {
    icon: '/assets/icon/favicon.ico',
    apple: '/assets/icon/apple-touch-icon.png',
  },
}

export const dynamic = 'auto'
export const revalidate = 60

const GA_MEASUREMENT_ID = siteMetadata.googleAnalytics?.trackingID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <head>
        <GoogleAnalyticsScript googleAnalyticsID={GA_MEASUREMENT_ID} />
      </head>
      <body>
        <main>
          <CookieBanner />
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </main>
      </body>
    </html>
  )
}
