import React from "react";
import MethodeStep from "../MethodeStep";
import { faCarSide, faExpand, faHandshake } from "@fortawesome/free-solid-svg-icons";
import Link from "@/components/ui/Link";

export default function MethodeSteps()
{
    return(
        <div className='methode-steps'>
            <MethodeStep animationDelay={100} title="Éclairer" imageSrc="/api/media/file/lighthouse.png" >
                
                <p className="grow-1">Poser un regard structuré et objectif sur votre situation IT, avant toute décision structurante.</p>
                <Link href="/methode-kadaur#eclairer" linkColor="gold" className="m-0! mt-4! text-sm! w-full">En savoir +</Link>
            </MethodeStep>
            <MethodeStep animationDelay={200} title="Structurer" imageSrc="/api/media/file/structurer2.png">
                
                <p className="grow-1">Reprendre le contrôle, sécuriser la gouvernance et redonner une trajectoire lisible</p>
                <Link href="/methode-kadaur#structurer" linkColor="gold" className="m-0! mt-4! text-sm! w-full">En savoir +</Link>
            </MethodeStep>
            <MethodeStep animationDelay={300} title="Ancrer" imageSrc="/api/media/file/ancrer.png">
                
                <p className="grow-1">Stabiliser les pratiques, renforcer l'adhésion et préserver le savoir interne</p>
                <Link href="/methode-kadaur#ancrer" linkColor="gold" className="m-0! mt-4! text-sm! w-full">En savoir +</Link>
            </MethodeStep>
        </div>
    )
}