'use client'

import React from "react";
import OfferInfosClient from "./OfferInfosClient";

export type USP = 
{
    id: string
    label: string
}

export type Offer = 
{
    id: string
    name: string;
    icon?: string;
    description?: string;
    usp?: USP[];
    extraActionButtonLabel?: string;
    extraActionButtonUrl?: string;
}

interface OfferInfosProps
{
    offer :Offer;
}

export default function OfferInfos({offer} : OfferInfosProps)
{

    const usps = offer.usp as USP[];



    return(
        <div id={offer.id} className="offer-infos">
            <OfferInfosClient offer={offer as Offer} />
        </div>
    )
}