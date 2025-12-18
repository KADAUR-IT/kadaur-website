'use client'

import React, { useEffect, useRef } from "react"
import OfferCard from "./OfferCard"
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import { Offer } from "@/payload-types";

interface OfferSliderProps
{
    offers: Offer[]
}

export default function OfferSlider({offers}: OfferSliderProps) {

    const refs: React.RefObject<any>[] = []
    const buttons: string[] = []

    const visibleIds: string[] = useIntersectionObserver(refs, {
        threshold: 0.5, // 50% visible
    });

    const offersRender = offers.map((offer, index) => 
    {
        const ref = useRef(null)
        refs.push(ref);
        return(
            <OfferCard key={"offer" + index} ref={ref} offer={offer} index={index} id={"offer" + index} color="gold" animationDelay={index * 100}/>
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
