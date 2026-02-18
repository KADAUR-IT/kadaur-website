import React from 'react'
import '../(default)/styles.css'
import '@/styles/global.css'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  description: 'Livre blanc de KADAUR',
  title: 'KADAUR - Livre Blanc',
  icons: {
    icon: '/assets/icon/favicon.ico',
    apple: '/assets/icon/apple-touch-icon.png',
  },
}

const GA_MEASUREMENT_ID = 'G-MNVLLR4SMH'

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
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  )
}
