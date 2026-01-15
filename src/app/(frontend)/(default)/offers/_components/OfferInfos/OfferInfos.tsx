'use client'

import React from "react";
import OfferInfosClient from "./OfferInfosClient";
import { Offer } from "@/payload-types";

export type USP = 
{
    id: string
    label: string
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