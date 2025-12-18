import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import SectionTitle from "@/components/ui/SectionTitle";
import React from "react";

export default function MethodeCTA()
{
    return(
        <div className="methode-call-to-action">
            <div className="methode-call-to-action-text">
                <SectionTitle>Prêt à débloquer votre potentiel</SectionTitle>
                <p>Nous vous guidons vers la réuissite de vos projet IT</p>
            </div>
            
            <Link buttonColor="white" className="h-fit" href="/contact">Prendre RDV</Link>
            <Link className="h-fit" href="/about/methode-kadaur">En savoir plus</Link>

        </div>
    )
}