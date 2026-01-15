import React from "react";
import MethodeStep from "../MethodeStep";
import { faCarSide, faExpand, faHandshake } from "@fortawesome/free-solid-svg-icons";

export default function MethodeSteps()
{
    return(
        <div className='methode-steps'>
            <MethodeStep animationDelay={100} title="Conseil" description="Offrir une flexibilité dans l'exécution des projets, en adaptant rapidement nos stratégies aux exigences changeantes du marché." icon={faHandshake} imageSrc="/api/media/file/conseil.png" />
            <MethodeStep animationDelay={200} title="Structure" description="Optimiser la réactivité grâce à une gestion itérative des phases clés, tout en conservant la rigueur des méthodes traditionnelles." icon={faExpand} imageSrc="/api/media/file/structure.png"/>
            <MethodeStep animationDelay={300} title="Pilotage" description="Optimiser la réactivité grâce à une gestion itérative des phases clés, tout en conservant la rigueur des méthodes traditionnelles." icon={faCarSide} imageSrc="/api/media/file/test-1.png"/>
        </div>
    )
}