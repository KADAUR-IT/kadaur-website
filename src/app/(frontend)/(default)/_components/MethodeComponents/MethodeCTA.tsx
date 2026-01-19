import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import SectionTitle from "@/components/ui/SectionTitle";
import React from "react";

export default function MethodeCTA()
{
    return(
        <div className="methode-call-to-action">
            <div className="methode-call-to-action-text">
                <SectionTitle className="text-[32px]!">Un projet IT ne se pilote pas à l'aveugle</SectionTitle>
                <p>Chaque projet IT mérite un cadre clair avant toute décision structurante</p>
            </div>
            
            <Link linkColor="white" className="h-fit" href="/contact">Parler de votre situation</Link>
            <Link className="h-fit" href="/methode-kadaur">Comprendre notre approche</Link>

        </div>
    )
}