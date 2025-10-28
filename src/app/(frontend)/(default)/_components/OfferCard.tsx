import { IconDefinition, IconName } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Offer } from "@/payload-types";

type OfferCardColor = 'gold' | 'green' | 'blue' | 'red';

interface OfferCardProps {
    color : OfferCardColor;
    ref?: React.Ref<HTMLDivElement>;
    id?: string;
    offer: Offer
}

export default function OfferCard({color, ref, id, offer }: OfferCardProps) {
    return (
        <div className={`offer-card`} ref={ref} id={id}>
            <div className={`offer-icon ${color}`}>
              <FontAwesomeIcon icon={["fas", offer.icon as IconName]}/>
            </div>
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
            <Button buttonColor="white">En savoir plus</Button>
          </div>
    );
}
