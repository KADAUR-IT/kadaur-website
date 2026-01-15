'use client'

import React, { useRef } from "react";

import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionSubtitle from '@/components/ui/SectionSubtitle'
import OfferSlider from './_components/OfferSlider'
import AvisSlider from './_components/AvisSlider'
import { Article, Media, Offer } from "@/payload-types";
import ScrollButton from "./_components/ScrollButton";
import MethodeSteps from "./_components/MethodeComponents/MethodeSteps";
import MethodeUseCases from "./_components/MethodeComponents/MethodeUseCases";
import MethodeCTA from "./_components/MethodeComponents/MethodeCTA";
import ValeursSlider from "./_components/ValeursSlider";
import Link from "@/components/ui/Link";
import ClientSlider from "./_components/ClientSlide";
import ArticleCard from "./resources/actualites/_components/ArticleCard";

interface HomePageClientProps
{
    offers: Offer[],
    avis: {
        avisName: string;
        jobTitleAvis?: string | null | undefined;
        avisRating: number;
        avisText: string;
        id?: string | null | undefined;}[] | null | undefined,
    partner: {
        partnerName: string;
        partnerLogo: string | Media;
        id?: string | null;
    }[] | null | undefined,
    heroImage: Media,
    articles: Article[]
}


export default function HomePageClient({ offers, avis, partner, heroImage, articles }: HomePageClientProps) {
    const valeursSliderRef = useRef(null)

    const scrollValeurs = () => {
        //@ts-ignore
        valeursSliderRef.current?.scrollIntoView({ behavior: 'smooth',  });
    }


    return (
        <>
            <section className='hero-section'>
                <Image
                    alt={heroImage.alt}
                    height={1080}
                    src={heroImage.url as string}
                    width={1920}
                />
                <div className="overlay-hero"></div>
                <h1>Débloquez le potentiel de vos projets IT avec l'accompagnement expert KADAUR.</h1>
                <div className="flex flex-col md:flex-row gap-1 md:gap-6">
                    <Link linkColor="blue" href="/contact">Demandez votre diagnostic</Link>
                    <Button buttonColor="white" onClick={scrollValeurs}>Découvrez la méthode KADAUR</Button>
                </div>
                
            </section>

            {/*<ValeursSlider ref={valeursSliderRef} />*/}

            <section ref={valeursSliderRef} className='methode-section section'>
                <div>
                    <SectionTitle>Méthode KADAUR</SectionTitle>
                    <SectionSubtitle>La méthode KADAUR est conçue pour s’adapter aux réalités complexes de la gestion de projets IT</SectionSubtitle>
                </div>
                <MethodeSteps />
                <p>Cette combinaison unique permet de maximiser la performance de vos projets tout en maintenant le contrôle sur les délais, les coûts et la qualité.</p>

                <MethodeCTA />

                <MethodeUseCases />

            </section>

            <section className='offer-section section'>
                <SectionTitle>Nos offres</SectionTitle>
                <SectionSubtitle>Découvrez nos approches personnalisées pour optimiser chaque étape de vos projets IT</SectionSubtitle>
                <OfferSlider offers={offers}/>
                <Link href="/offers" linkColor="blue">Voir toutes nos offres</Link>
            </section>

            <section className='client-section section'>
                <SectionTitle>Nos Clients</SectionTitle>
                <SectionSubtitle>Ils nous ont fait confiance, pourquoi pas vous ?</SectionSubtitle>
                <ClientSlider partner={partner} />
                <AvisSlider avis={avis} />
            </section>

            <section className="actualities-section section">
                <SectionTitle>Actualités</SectionTitle>
                <SectionSubtitle>Découvrez nos dernières actualités</SectionSubtitle>
                <div className="flex w-full justify-between">
                    {
                        articles.map( (article) => {
                            return(
                                <ArticleCard key={article.id} article={article} />
                            )
                        })
                    }

                </div>
                <Link href="/resources/actualites" linkColor="blue">Voir toutes nos actualités</Link>
            </section>
        </>
    )
}