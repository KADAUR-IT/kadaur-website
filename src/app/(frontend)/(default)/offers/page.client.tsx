'use client'

import React, { useRef, useState, useEffect, RefObject } from "react";
import './styles.css'
import SectionTitle from "@/components/ui/SectionTitle";
import SectionSubtitle from "@/components/ui/SectionSubtitle";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import SubmitForm from "@/components/ui/Form/Submit/SubmitForm";
import OfferInfos, { Offer } from "./_components/OfferInfos/OfferInfos";
import OfferSliderButton from "./_components/OfferSliderButton";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import useWindowDimensions from "../_hooks/useWindowDimensions";
import Captcha from "@/components/ui/Form/Captcha/Captcha";
import FormContact from "./_components/FormContactOffer";
import { useSearchParams } from "next/navigation";
import { FormBlock } from "@/payload-types";
import FormBlockComponent from "@/components/blocks/FormBlockComponent";

interface OffersPageClientProps
{
    offers: Offer[],
    form: FormBlock | null
}

export default function OffersPageClient({ offers, form } : OffersPageClientProps)
{
    const searchParams = useSearchParams()
    const [offerVisible, setOfferVisible] = useState(offers[parseInt(searchParams.get("id") as string) || 0].id)
    const [offerInfoVisible, setOfferInfoVisible] = useState(offers[parseInt(searchParams.get("id") as string) || 0])
    const slidesBtnRef : React.Ref<HTMLAnchorElement>[] = []
    const {height, width} = useWindowDimensions() ?? {}
    const recaptchaRef = useRef(null)

    const offerButtonList = offers.map( (offer) => {

        let refBtn = useRef(null)
        slidesBtnRef.push(refBtn)
        return(
            <OfferSliderButton ref={refBtn} key={offer.id} offer={offer as Offer} isActive={offerVisible===offer.id} handler={handleVisible} />
        )
    })

    function handleVisible(id : string)
    {
        setOfferVisible(id);
        setOfferInfoVisible(offers.find( (offer) =>  offer.id == id ) || offers[0])

        /*const el = document.getElementById(id)

        if(el){
            el.scrollIntoView({behavior : "instant", inline: "start", block: "nearest"})
        }*/
    }

    const visibleIds = useIntersectionObserver(slidesBtnRef as RefObject<HTMLElement>[], {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        if(!width) return
        if(width > 980) return

        let visibleId = visibleIds[0] as string

        if(visibleId) handleVisible(visibleId.replaceAll("-btn", ""))

    }, [visibleIds]);

    return (
        <>
            <div className="offers-main">
                <SectionTitle>Nos offres</SectionTitle>
                <SectionSubtitle>Découvrez nos approches personnalisées pour optimiser chaque étape de vos projets IT</SectionSubtitle>

                <div className="offers-container">
                    <div className="offers-slider-btn">
                        {offerButtonList}
                    </div>
                    <div className="offer-content">
                        <div className="offer-slider">
                            <OfferInfos key={offerInfoVisible.id} offer={offerInfoVisible} />
                        </div>
                        <div className="md:max-w-[450px] w-full offer-form">
                            { form ? <><h4>{form.title}</h4><FormBlockComponent block={form} /></> : <FormContact /> }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}