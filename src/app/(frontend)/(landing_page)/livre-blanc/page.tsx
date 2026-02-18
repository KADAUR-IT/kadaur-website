import react from 'react'
import LivreBlancPageClient from './page.client'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export default async function LivreBlancPage() {
  const payload = await getPayload({ config: payloadConfig })
  const res = await payload.findGlobal({
    slug: 'settings',
  })

  const livreBlancData = res.livreBlanc

  return <LivreBlancPageClient livreBlanc={livreBlancData} />
}
