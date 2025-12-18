import React from 'react'
import '../(default)/styles.css'
import 'src/styles/global.css'
import './style.css'
import Footer from '@/components/ui/Footer'
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'KADAUR',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const headersRequest = await headers()
 
  if(!headersRequest.get('auth-user')) return
  
  const payload = await getPayload({ config: payloadConfig })

  const user = await payload.findByID({
    collection: "users",
    id: headersRequest.get("auth-user") as string
  })


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