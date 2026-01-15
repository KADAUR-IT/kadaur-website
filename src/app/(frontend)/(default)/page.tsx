import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import HomePageClient from './page.client'
import { Media } from '@/payload-types'

const payload = await getPayload({config})

const res = await payload.find({
    collection: "pages", 
    where: {
        slug: {equals: "/"}
    },
    limit: 1
})

const page = res.docs[0]

export const metadata = {
  title: "KADAUR - " + (page.meta?.title || "Bienvenue sur le site de KADAUR")
}


export default async function HomePage() {
  //const headers = await getHeaders()
  //const { user } = await payload.auth({ headers })


  const offers = await payload.find({
    collection: "offers"
  })

  const avis = page.avisToShow
  const partner = page.partnerToShow
  const heroImage = page.heroImage as Media

  const articles = await payload.find({
      collection: "article",
      limit: 3,
  })

  return (
    <>
      <HomePageClient offers={offers.docs.reverse()} avis={avis} partner={partner} heroImage={heroImage} articles={articles.docs} />
    </>
  )
}
