import React from 'react'
import './styles.css'
import 'src/styles/global.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Script from 'next/script'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'KADAUR',
}

const GA_MEASUREMENT_ID = 'G-MNVLLR4SMH';

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
        </main>
      </body>
    </html>
  )
}
