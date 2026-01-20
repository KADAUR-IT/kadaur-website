'use client'

import React, { useRef, useState, useEffect, RefObject } from "react";
import './styles.css'
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";
import OfferSliderButton from "./_components/OfferSliderButton";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import useWindowDimensions from "../_hooks/useWindowDimensions";
import FormContact from "./_components/FormContactOffer";
import { useSearchParams } from "next/navigation";
import { FormBlock, Offer } from "@/payload-types";
import FormBlockComponent from "@/components/blocks/FormBlockComponent";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button";
import OfferInfos from "./_components/OfferInfos/OfferInfos";
import OfferInfoCard from "./_components/OfferInfoCard";
import Link from "@/components/ui/Link";
import RichText from "@/components/ui/RichText";

interface OffersPageClientProps
{
    offers: Offer[],
    form: FormBlock | null,
    description: any,
}

export default function OffersPageClient({ offers, form, description } : OffersPageClientProps)
{
    const searchParams = useSearchParams()
    const [offerVisible, setOfferVisible] = useState(offers[parseInt(searchParams.get("id") as string) || 0].id)
    const [offerInfoVisible, setOfferInfoVisible] = useState(offers[parseInt(searchParams.get("id") as string) || 0])
    const [modalOfferIsOpen, setModalIsOpen] = useState(searchParams.has("id"))
    /*const slidesBtnRef : React.Ref<HTMLAnchorElement>[] = []
    const {height, width} = useWindowDimensions() ?? {}
    const recaptchaRef = useRef(null)*/

    /*const offerButtonList = offers.map( (offer) => {

        let refBtn = useRef(null)
        slidesBtnRef.push(refBtn)
        return(
            <OfferSliderButton ref={refBtn} key={offer.id} offer={offer as Offer} isActive={offerVisible===offer.id} handler={handleVisible} />
        )
    })*/


    const offerCard = offers.map( (offer) => {
        return(
            <OfferInfoCard offer={offer} key={offer.id} handle={() => handleModalOpening(offer.id)} />
        )
    } )

    function handleVisible(id : string)
    {
        setOfferVisible(id);
        setOfferInfoVisible(offers.find( (offer) =>  offer.id == id ) || offers[0])
    }

    function handleModalOpening(id : string)
    {
        setOfferVisible(id)
        setOfferInfoVisible(offers.find( (offer) =>  offer.id == id ) || offers[0])
        setModalIsOpen(true)
    }

    function handleModalClosing()
    {
        setModalIsOpen(false)
    }

    /*const visibleIds = useIntersectionObserver(slidesBtnRef as RefObject<HTMLElement>[], {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        if(!width) return
        if(width > 980) return

        let visibleId = visibleIds[0] as string

        if(visibleId) handleVisible(visibleId.replaceAll("-btn", ""))

    }, [visibleIds]);*/

    return (
        <>
            <div className="offers-main">
                <SectionTitle>Nos offres</SectionTitle>
                <SectionSubtitle>Des offres conçues pour intervenir avec justesse à chaque étape clé de vos projets IT</SectionSubtitle>
                <RichText data={description} className="mb-4" />

                <div className="offers-container">
                    <div className="flex flex-col gap-2 md:flex-row">
                        {offerCard}
                    </div>

                    <div className="methode-call-to-action">
                        <div className="methode-call-to-action-text">
                            <SectionTitle className="text-[32px]!">Un projet IT ne se pilote pas à l'aveugle</SectionTitle>
                            <p>Chaque projet IT mérite un cadre clair avant toute décision structurante</p>
                        </div>
                        
                        <Link linkColor="white" className="h-fit text-center" href="/contact">Echangeons sur votre contexte IT</Link>
                        <Link className="h-fit text-center" href="/methode-kadaur">Comprendre notre approche</Link>
            
                    </div>
                </div>

                

                <Modal isOpen={modalOfferIsOpen} onClose={handleModalClosing} modalStyle="blue">
                    <div className="offer-content">
                        <div className="offer-slider">
                            <OfferInfos key={offerInfoVisible.id} offer={offerInfoVisible} />
                        </div>
                        <div className="md:max-w-[450px] w-full offer-form">
                            { offerInfoVisible.form && offerInfoVisible.form.length ? <><h4>{offerInfoVisible.form[0].title}</h4><FormBlockComponent block={offerInfoVisible.form[0]} /></> : form ? <><h4>{form.title}</h4><FormBlockComponent block={form} /></> : <FormContact /> }
                        </div>
                    </div>
                </Modal>

            </div>

            
        </>
    )
}