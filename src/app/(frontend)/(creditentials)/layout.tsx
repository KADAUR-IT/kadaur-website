import React from 'react'
import '../(default)/styles.css'
import 'src/styles/global.css'
import Footer from '@/components/ui/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'KADAUR',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body>
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
