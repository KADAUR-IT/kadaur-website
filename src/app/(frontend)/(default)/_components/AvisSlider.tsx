'use client'

import React, { RefObject, useEffect, useRef } from "react"
import AvisCard from "./AvisCard";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";

interface AvisSliderProps{
    avis: {
        avisName: string;
        jobTitleAvis?: string | null | undefined;
        avisRating: number;
        avisText: string;
        id?: string | null | undefined;}[] | null | undefined,
}

export default function AvisSlider({avis} : AvisSliderProps) {

    const avisRefs: RefObject<HTMLDivElement>[] = []

    const render = avis?.map( (a, index) => {
        const ref = useRef<HTMLDivElement>(null)
        avisRefs.push(ref as RefObject<HTMLDivElement>)

        return(
            <AvisCard key={a.id} ref={ref} id={`avis${index}`} author={`${a.avisName} - ${a.jobTitleAvis}`} rating={a.avisRating} animationDelay={100 * index}>
                "{a.avisText}"
            </AvisCard>
        )
    } )

    const visibleIds : string[] = useIntersectionObserver(avisRefs as RefObject<HTMLElement>[], {
        threshold: 0.5, // 50% visible
    });

    //console.log(visibleIds);

    useEffect(() => {
        // Met à jour les boutons en fonction des cartes visibles
        const buttons = ['avis1-btn', 'avis2-btn', 'avis3-btn'];
        buttons.forEach((btnId, index) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                if (visibleIds.includes(`avis${index + 1}`)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }, [visibleIds]);

    return(
        <>
        <div className='avis-cards'>
            {render}
            
        </div>
        <div className='avis-slider-btn'>
            <a className='active' id="avis1-btn" href='#avis1'></a>
            <a id="avis2-btn" href='#avis2'></a>
            <a id="avis3-btn" href='#avis3'></a>
        </div>
        </>
    )

}