'use client'

import { faDumbbell, faLifeRing, faSearch, faStairs } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useRef, useState } from "react"
import OfferCard from "./OfferCard"
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import { Offer } from "@/payload-types";

interface OfferSliderProps
{
    offers: Offer[]
}

export default function OfferSlider({offers}: OfferSliderProps) {

    /*const offer1 = useRef(null);
    const offer2 = useRef(null);
    const offer3 = useRef(null);
    const offer4 = useRef(null);*/

    const refs: React.RefObject<any>[] = []
    const buttons: string[] = []

    const visibleIds = useIntersectionObserver(refs, {
        threshold: 0.5, // 50% visible
    });

    //console.log(visibleIds);

    const offersRender = offers.map((offer, index) => 
    {
        const ref = useRef(null)
        refs.push(ref);
        return(
            <OfferCard key={"offer" + index} ref={ref} offer={offer} id={"offer" + index} color="gold"/>
        )
    })

    const offersBtnRender = offers.map((offer, index) => 
    {
        const id= "offer" + index + "-btn"
        buttons.push(id)
        return(
            <a key={id} className={index == 0 ? 'active' : ""} id={id} href={"#offer" + index}></a>
        )
    })

    useEffect(() => {
        // Met à jour les boutons en fonction des cartes visibles
        buttons.forEach((btnId, index) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                if (visibleIds.includes(`offer${index}`)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }, [visibleIds, buttons]);
    

    return (
        <>
        <div className='offer-cards'>
            {offersRender}
        </div>
        <div className='offer-slider-btn'>
            {offersBtnRender}
        </div>
        </>
    )
}
