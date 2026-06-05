'use client'

import React, { useRef } from 'react'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionSubtitle from '@/components/ui/SectionSubtitle'
import OfferSlider from './_components/OfferSlider'
import AvisSlider from './_components/AvisSlider'
import { Article, Media, Offer } from '@/payload-types'
import ScrollButton from './_components/ScrollButton'
import MethodeSteps from './_components/MethodeComponents/MethodeSteps'
import MethodeUseCases from './_components/MethodeComponents/MethodeUseCases'
import MethodeCTA from './_components/MethodeComponents/MethodeCTA'
import ValeursSlider from './_components/ValeursSlider'
import Link from '@/components/ui/Link'
import ClientSlider from './_components/ClientSlide'
import ArticleCard from './resources/actualites/_components/ArticleCard'
import { imageLoader } from '@/utils/images/imagesLoader'
import ServiceCard from './_components/ServiceCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import WhyCard from './_components/WhyCard'

interface HomePageClientProps {
  offers: Offer[]
  avis:
    | {
        avisName: string
        jobTitleAvis?: string | null | undefined
        avisRating: number
        avisText: string
        id?: string | null | undefined
      }[]
    | null
    | undefined
  partner:
    | {
        partnerName: string
        partnerLogo: string | Media
        id?: string | null
      }[]
    | null
    | undefined
  heroImage: Media
  articles: Article[]
}

export default function HomePageClient({
  offers,
  avis,
  partner,
  heroImage,
  articles,
}: HomePageClientProps) {
  const valeursSliderRef = useRef(null)

  const scrollValeurs = () => {
    //@ts-ignore
    valeursSliderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-(--color-blue)">
      {/* Hero  */}
      <section className="h-dvh w-full relative flex flex-col justify-center items-center overflow-hidden">
        <Image
          alt={heroImage.alt}
          height={heroImage.height as number}
          src={heroImage.url as string}
          width={heroImage.width as number}
          loader={imageLoader}
          className="absolute top-0 left-0 min-h-dvh min-w-full object-cover"
        />
        <div className="absolute top-0 left-0 h-dvh w-full bg-radial-[at_50%_0%] from-(--color-blue)/40 to-(--color-blue) to-71%"></div>
        <h1 className="text-center text-(--color-white)! max-w-9/10 md:max-w-[1200px] md:m-0!">
          Gagnez en <span className="text-(--color-gold)">visibilité</span> ,{' '}
          <span className="text-(--color-gold)">maîtrise</span> et{' '}
          <span className="text-(--color-gold)">capacité de décisions</span> sur votre
          infrastructure IT
        </h1>
        <h2 className="text-center text-white text-md md:text-xl max-w-9/10 md:max-w-[1200px] font-normal!">
          Nous sécurisons les décisions et pilotons ceux qui la déploient dans votre intérêt
        </h2>
        <div className="flex flex-col md:flex-row gap-1 md:gap-6 z-10 my-4 md:my-0">
          <Link linkColor="gold" href="/contact" className="hover:scale-102 group">
            Planifier un échange{' '}
            <FontAwesomeIcon
              className="group-hover:translate-x-0.5 transition-transform transition-300"
              icon={faArrowRight}
            />
          </Link>
          <Link linkColor="white" href="/offers" className="hover:scale-102 group">
            Nos services{' '}
            <FontAwesomeIcon
              className="group-hover:translate-x-0.5 transition-transform transition-300"
              icon={faArrowRight}
            />
          </Link>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full flex flex-col items-center p-6"
          onClick={scrollValeurs}
        >
          <p>Découvrez nos services</p>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </section>

      {/* Services  */}
      <section ref={valeursSliderRef} className="flex flex-col items-center gap-10 py-20 px-6">
        <h2 className="text-[36px]! leading-[36px] text-(--color-white)! font-semibold! text-center md:w-[800px]">
          Chaque situation appelle une réponse différente
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-2 md:max-w-[900px] gap-4 md:gap-[32px]">
          {offers.map((offer, index) => (
            <ServiceCard key={offer.id} service={offer} index={index} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-6 z-10">
          <Link linkColor="gold" href="/contact" className="hover:scale-102 group">
            Nous contacter{' '}
            <FontAwesomeIcon
              className="group-hover:translate-x-0.5 transition-transform transition-300"
              icon={faArrowRight}
            />
          </Link>
          <Link linkColor="white" href="/offers">
            En découvrir plus
          </Link>
        </div>
      </section>

      {/* Clients  */}
      <section className="flex flex-col items-center gap-10 py-20 px-6">
        <h2 className="text-[36px]! leading-[36px] text-(--color-white)! font-semibold! text-center md:w-[800px]">
          Ils nous ont fait confiance, pourquoi pas vous ?
        </h2>
        <ClientSlider partner={partner} />
      </section>

      <section className="flex flex-col items-center gap-10 py-20 px-6">
        <h2 className="text-[36px]! leading-[36px] text-(--color-white)! font-semibold! text-center md:w-[800px]">
          Ce qui change avec KADAUR
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-2 md:max-w-[900px] gap-4 md:gap-[32px]">
          <WhyCard
            title="Une infrastructure enfin lisible"
            description="Nous transformons une infrastructure complexe en un environnement compréhensible et pilotable."
            column={1}
          />
          <WhyCard
            title="Des décisions prises avec confiance"
            description="Nous apportons la visibilité nécessaire pour arbitrer et faire évoluer votre infrastructure sereinement."
            column={1}
          />
          <WhyCard
            title="Un partenaire indépendant"
            description="Nous ne remplaçons pas vos prestataires. Nous vous aidons à garder la maîtrise de votre trajectoire IT"
            column={2}
          />
        </div>

        <Link href="/about/us" linkColor="white">
          En savoir plus sur nous
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </section>

      {/* Actualités  */}
      <section className="flex flex-col items-center gap-10 py-20 px-6">
        <h2 className="text-[36px]! leading-[36px] text-(--color-white)! font-semibold! text-center md:w-[800px]">
          Découvrez nos dernières actualités
        </h2>
        <div className="flex flex-col items-center md:flex-row w-full md:justify-center gap-4 md:gap-10">
          {articles.map((article) => {
            return <ArticleCard key={article.id} article={article} />
          })}
        </div>
        <Link href="/resources/actualites" linkColor="white">
          Voir toutes nos actualités
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </section>

      {/* CTA  */}
      <section className="flex flex-col items-center gap-10 py-20 px-6">
        <h2 className="text-center text-3xl md:text-5xl text-(--color-white)! md:max-w-[1200px] m-0!">
          Le <span className="text-(--color-gold)">vrai coût</span> d'une infrastructure IT mal
          pilotée n'est pas ce qu'elle <span className="text-(--color-gold)">consomme</span>. <br />
          C'est ce qu'elle vous <span className="text-(--color-gold)">empêche de faire</span>.{' '}
          <br />
          <span className="text-(--color-gold)">Parlons en !</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-1 md:gap-6 z-10">
          <Link linkColor="gold" href="/contact" className="hover:scale-102 group">
            Planifier un echange{' '}
            <FontAwesomeIcon
              className="group-hover:translate-x-0.5 transition-transform transition-300"
              icon={faArrowRight}
            />
          </Link>
        </div>
      </section>
    </div>
  )

  /*
  return (
    <>
      <section className="hero-section">
        <Image
          alt={heroImage.alt}
          height={1080}
          src={heroImage.url as string}
          width={1920}
          loader={imageLoader}
        />
        <div className="overlay-hero"></div>
        <h1>Piloter l'Infrastructure IT comme un produit stratégique</h1>
        <h2 className="text-center text-white text-xl md:text-2xl md:max-w-[900px]">
          Nous sécurisons les décisions et pilotons ceux qui la déploient dans votre intérêt
        </h2>
        <div className="flex flex-col md:flex-row gap-1 md:gap-6">
          <Link linkColor="blue" href="/contact">
            Echangeons sur votre contexte IT
          </Link>
          <Link linkColor="gold" href="/methode-kadaur">
            Découvrez la méthode KADAUR
          </Link>
        </div>
      </section>


      <section ref={valeursSliderRef} className="methode-section section">
        <div>
          <SectionTitle>Méthode KADAUR</SectionTitle>
          <SectionSubtitle>Une méthode conçue pour les projets IT complexes.</SectionSubtitle>
        </div>
        <MethodeSteps />
        <p>
          Cette approche structurée vous permet de <strong>sécuriser vos décisions</strong>,{' '}
          <strong>maîtriser les risques</strong> et{' '}
          <strong>piloter vos projets IT dans la durée</strong>, sans perdre le contrôle des délais,
          des coûts et de la qualité.
        </p>

        <MethodeCTA />

        <MethodeUseCases />
      </section>

      <section className="offer-section section">
        <SectionTitle>Nos offres</SectionTitle>
        <SectionSubtitle>
          Des offres pensées pour éclairer, structurer et sécuriser vos projets IT
        </SectionSubtitle>
        <OfferSlider offers={offers} />
        <Link href="/offers" linkColor="blue">
          Voir toutes nos offres
        </Link>
      </section>

      <section className="client-section section">
        <SectionTitle>Nos Clients</SectionTitle>
        <SectionSubtitle>Ils nous ont fait confiance, pourquoi pas vous ?</SectionSubtitle>
        <ClientSlider partner={partner} />
        <AvisSlider avis={avis} />
      </section>

      <section className="actualities-section section">
        <SectionTitle>Actualités</SectionTitle>
        <SectionSubtitle>Découvrez nos dernières actualités</SectionSubtitle>
        <div className="flex flex-col items-center md:flex-row w-full md:justify-between">
          {articles.map((article) => {
            return <ArticleCard key={article.id} article={article} />
          })}
        </div>
        <Link href="/resources/actualites" linkColor="blue">
          Voir toutes nos actualités
        </Link>
      </section>
    </>
  )*/
}
