'use client'

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Media, Offer } from "@/payload-types";
import Image from "next/image";
import Button from "@/components/ui/Button";

library.add(fas)

interface OfferInfoCardProps
{
    offer: Offer,
    handle: () => void
}

export default function OfferInfoCard({offer, handle} : OfferInfoCardProps)
{
    const offerImage = offer.image as Media || null
    const usps = offer.usp?.map( (usp) => {
        return(
            <li key={usp.id}>{usp.label}</li>
        )
    } )

    return (
        <div className={`offer-card`}>
            <h3>{offer.name}</h3>
            {offerImage && 
                <Image
                    src={offerImage.url as string}
                    alt={offerImage.alt as string}
                    width={offerImage.width as number}
                    height={offerImage.height as number}
                    className="w-[200px] h-auto"
                />
            }
            <h4>{offer.description}</h4>
            <ul>
                {usps}
            </ul>
            <Button buttonColor="white" className="w-full m-0!" onClick={handle} >En savoir +</Button>
            
            
        </div>
    )
}