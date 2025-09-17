import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type OfferCardColor = 'gold' | 'green' | 'blue' | 'red';

interface OfferCardProps {
    title: string;
    description: string;
    icon: IconDefinition;
    color : OfferCardColor;
    ref?: React.Ref<HTMLDivElement>;
    id?: string;
}

export default function OfferCard({ title, description, icon, color, ref, id }: OfferCardProps) {
    return (
        <div className={`offer-card`} ref={ref} id={id}>
            <div className={`offer-icon ${color}`}>
              <FontAwesomeIcon icon={icon}/>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Button>En savoir plus</Button>
          </div>
    );
}
