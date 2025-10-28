'use client'

import React, { useEffect, useRef, useState } from "react"
import AvisCard from "./AvisCard";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";

export default function AvisSlider() {

    const avis1 = useRef(null);
    const avis2 = useRef(null);
    const avis3 = useRef(null);

    const visibleIds = useIntersectionObserver([avis1, avis2, avis3], {
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
            <AvisCard ref={avis1} id="avis1" author="Sophie - Directrice Générale d'une PME">
                "Grâce à l’accompagnement de KADAUR, nous avons enfin pu moderniser notre infrastructure IT sans interrompre notre activité. Leur approche pragmatique et leur capacité à vulgariser la technique ont été un vrai atout. Aujourd’hui, notre système est plus fiable, plus rapide, et nous avons gagné en productivité."
            </AvisCard>
            <AvisCard ref={avis2} id="avis2" author="Claire -  CEO d'une startup tech en phase de croissance à Paris ">
                "Nous avions besoin de scaler rapidement notre infrastructure pour absorber la croissance des utilisateurs. L’équipe KADAUR a su mettre en place une architecture solide, évolutive et sécurisée. Résultat : nous avons doublé notre capacité sans incident majeur, et nos équipes peuvent se concentrer sur le produit."
            </AvisCard>
            <AvisCard ref={avis3} id="avis3" author="Karim -  CTO d'une startup/scale-up ">
                "KADAUR a parfaitement compris nos enjeux métiers et a proposé des solutions IT alignées sur nos objectifs business. Leur expertise et leur disponibilité ont fait la différence : nous avons gagné en sérénité et en efficacité au quotidien."
            </AvisCard>
            
        </div>
        <div className='avis-slider-btn'>
            <a className='active' id="avis1-btn" href='#avis1'></a>
            <a id="avis2-btn" href='#avis2'></a>
            <a id="avis3-btn" href='#avis3'></a>
        </div>
        </>
    )

}