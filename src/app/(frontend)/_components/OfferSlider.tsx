'use client'

import { faDumbbell, faLifeRing, faSearch, faStairs } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useRef, useState } from "react"
import OfferCard from "./OfferCard"
import useIntersectionObserver from "../_hooks/useIntersectionObserver";

export default function OfferSlider() {

    const offer1 = useRef(null);
    const offer2 = useRef(null);
    const offer3 = useRef(null);
    const offer4 = useRef(null);

    const visibleIds = useIntersectionObserver([offer1, offer2, offer3, offer4], {
        threshold: 0.5, // 50% visible
    });

    //console.log(visibleIds);

    useEffect(() => {
        // Met à jour les boutons en fonction des cartes visibles
        const buttons = ['offer1-btn', 'offer2-btn', 'offer3-btn', 'offer4-btn'];
        buttons.forEach((btnId, index) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                if (visibleIds.includes(`offer${index + 1}`)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }, [visibleIds]);
    

    return (
        <>
        <div className='offer-cards'>
            <OfferCard ref={offer1} id="offer1" title="Offre 1" description="Description de l'offre 1" icon={faSearch} color="gold"/>
            <OfferCard ref={offer2} id="offer2" title="Offre 2" description="Description de l'offre 2" icon={faLifeRing} color="green"/>
            <OfferCard ref={offer3} id="offer3" title="Offre 3" description="Description de l'offre 3" icon={faDumbbell} color="blue"/>
            <OfferCard ref={offer4} id="offer4" title="Offre 4" description="Description de l'offre 4" icon={faStairs} color="red"/>
        </div>
        <div className='offer-slider-btn'>
            <a className='active' id="offer1-btn" href='#offer1'></a>
            <a id="offer2-btn" href='#offer2'></a>
            <a id="offer3-btn" href='#offer3'></a>
            <a id="offer4-btn" href='#offer4'></a>
        </div>
        </>
    )
}
