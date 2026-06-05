import react from 'react'
import LivreBlancPageClient from './page.client'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { FormBlock } from '@/payload-types'

export default async function LivreBlancPage() {
  const payload = await getPayload({ config: payloadConfig })
  const res = await payload.findGlobal({
    slug: 'settings',
  })

  const livreBlancData = res.livreBlanc

  const resPage = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'livre-blanc' },
    },
    limit: 1,
  })

  const page = resPage.docs[0]
  const form = page.form?.[0] as FormBlock

  if (!form) {
    return <></>
  }

  return <LivreBlancPageClient livreBlanc={livreBlancData} formBlock={form} />
}
