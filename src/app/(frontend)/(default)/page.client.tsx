'use client'

import React, { useRef } from "react";

import Image from 'next/image'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionSubtitle from '@/components/ui/SectionSubtitle'
import OfferSlider from './_components/OfferSlider'
import AvisSlider from './_components/AvisSlider'
import { Media, Offer } from "@/payload-types";
import ScrollButton from "./_components/ScrollButton";
import MethodeSteps from "./_components/MethodeComponents/MethodeSteps";
import MethodeUseCases from "./_components/MethodeComponents/MethodeUseCases";
import MethodeCTA from "./_components/MethodeComponents/MethodeCTA";
import ValeursSlider from "./_components/ValeursSlider";
import Link from "@/components/ui/Link";
import ClientSlider from "./_components/ClientSlide";

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
}


export default function HomePageClient({ offers, avis, partner }: HomePageClientProps) {
    const valeursSliderRef = useRef(null)

    const scrollValeurs = () => {
        //@ts-ignore
        valeursSliderRef.current?.scrollIntoView({ behavior: 'smooth',  });
    }


    return (
        <>
            <div className='hero-section'>
                <Image
                alt="Kadaur Hero"
                height={1080}
                src="/api/media/file/hero_image.jpg"
                width={1920}
                />
                <h1>Débloquez le potentiel de vos projets IT avec l'accompagnement expert KADAUR.</h1>
                <Link href="/contact">Demandez votre diagnostic</Link>
                <p>Découvrez la méthode KADAUR</p>
                <ScrollButton onClick={scrollValeurs}/>
            </div>

            <ValeursSlider ref={valeursSliderRef} />

            <div className='methode-section section'>
                <div>
                    <SectionTitle>Méthode KADAUR</SectionTitle>
                    <SectionSubtitle>La méthode KADAUR est conçue pour s’adapter aux réalités complexes de la gestion de projets IT</SectionSubtitle>
                </div>
                <MethodeSteps />
                <p>Cette combinaison unique permet de maximiser la performance de vos projets tout en maintenant le contrôle sur les délais, les coûts et la qualité.</p>

                <MethodeUseCases />

                <MethodeCTA />

            </div>

            <div className='offer-section section'>
                <SectionTitle>Nos offres</SectionTitle>
                <SectionSubtitle>Découvrez nos approches personnalisées pour optimiser chaque étape de vos projets IT</SectionSubtitle>
                <OfferSlider offers={offers}/>
            </div>

            <div className='client-section'>
                <SectionTitle>Nos Clients</SectionTitle>
                <SectionSubtitle>Ils nous ont fait confiance, pourquoi pas vous ?</SectionSubtitle>
                <ClientSlider partner={partner} />
                <AvisSlider avis={avis} />
            </div>
        </>
    )
}