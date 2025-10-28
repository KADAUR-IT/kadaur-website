'use client'

import React, { useRef, useState, useEffect } from "react";
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

interface OffersPageClientProps
{
    offers: Offer[]
}

export default function OffersPageClient({ offers } : OffersPageClientProps)
{
    const [offerVisible, setOfferVisible] = useState(offers[0].id)
    const slidesBtnRef : React.Ref<HTMLAnchorElement>[] = []
    const {height, width} = useWindowDimensions() ?? {}

    const offerButtonList = offers.map( (offer) => {

        let refBtn = useRef(null)
        slidesBtnRef.push(refBtn)
        return(
            <OfferSliderButton ref={refBtn} key={offer.id} offer={offer as Offer} isActive={offerVisible===offer.id} handler={handleVisible} />
        )
    })

    const offerInfosList = offers.map( (offer) => {
        return(
            <OfferInfos key={offer.id} offer={offer} />
        )
    } )

    function handleVisible(id : string)
    {
        setOfferVisible(id);
        const el = document.getElementById(id)

        if(el){
            el.scrollIntoView({behavior : "instant", inline: "start", block: "nearest"})
        }
    }

    

    const visibleIds = useIntersectionObserver(slidesBtnRef, {
        threshold: 0.5, // 50% visible
    });

    //console.log(visibleIds)

    useEffect(() => {
        if(width > 980) return

        let visibleId = visibleIds[0] as string
        //console.log(visibleId.replaceAll("-btn", ""))

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
                            {offerInfosList}
                        </div>
                        <form className="offer-form">
                            <h4>Discutons en ensemble !</h4>
                            <Input id="entreprise_form" label="Entreprise" placeholder="KADAUR"/>
                            <Input id="name_form" label="Nom" placeholder="Jean Dupont" />
                            <Input id="mail_form" label="E-mail" type="mail" placeholder="nom@mail.com" />
                            <TextArea id="message_form" label="Message" placeholder="" />
                            <SubmitForm buttonStyle="gold">Nous contacter !</SubmitForm>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}