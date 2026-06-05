import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import HomePageClient from './page.client'
import { Media } from '@/payload-types'
import ImageHandler from '@/utils/singleton/ImageHandler'

const payload = await getPayload({ config })

const res = await payload.find({
  collection: 'pages',
  where: {
    slug: { equals: '/' },
  },
  limit: 1,
})

const page = res.docs[0]

export const metadata = {
  title: 'KADAUR - ' + (page.meta?.title || 'Bienvenue sur le site de KADAUR'),
}

export default async function HomePage() {
  //const headers = await getHeaders()
  //const { user } = await payload.auth({ headers })

  const cache = ImageHandler.getInstance(payload).getCache()

  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: '/' },
    },
    limit: 1,
    depth: 0,
  })

  const page = res.docs[0]

  const offers = await payload.find({
    collection: 'offers',
  })

  const partnerImages = await cache.findManyById(
    page.partnerToShow?.map((p) => p.partnerLogo as string) || [],
  )
  const avis = page.avisToShow
  const partner = page.partnerToShow?.map((p) => {
    const logo: Media = partnerImages.find((i) => p.partnerLogo === i.id)!

    return {
      ...p,
      partnerLogo: logo,
    }
  })
  const heroImage = await cache.findById(page.heroImage as string)

  const articles = await payload.find({
    collection: 'article',
    where: {
      _status: { equals: 'published' },
    },
    limit: 3,
  })

  return (
    <>
      <HomePageClient
        offers={offers.docs.reverse()}
        avis={avis}
        partner={partner}
        heroImage={heroImage}
        articles={articles.docs}
      />
    </>
  )
}
