import React from 'react'
import '../(default)/styles.css'
import 'src/styles/global.css'
import './style.css'
import Footer from '@/components/ui/Footer'
import Sidebar from '@/components/ui/Sidebar/Sidebar'

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
          <div className='dashboard-content'>
            <Sidebar />
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}