import React from 'react'
import './styles.css'
import 'src/styles/global.css'
import Navbar from '@/components/ui/Navbar'
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
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
