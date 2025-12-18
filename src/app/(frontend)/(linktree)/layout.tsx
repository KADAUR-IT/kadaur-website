import React from 'react'
import '../(default)/styles.css'
import '@/styles/global.css'
import Script from 'next/script'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'KADAUR - Link Tree',
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
      <body className='bg-gray-900'>
        <main className='w-full flex items-center justify-center p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
