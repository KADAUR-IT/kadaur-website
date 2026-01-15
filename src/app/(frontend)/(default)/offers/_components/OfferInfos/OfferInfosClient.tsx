import React from "react";
import UniqueSellingPoint from "../UniqueSellingPoint";
import { USP } from "./OfferInfos";
import { Offer } from "@/payload-types";
import RichText from "@/components/ui/RichText";

interface OfferInfosClientProps
{
    offer: Offer
}

export default function OfferInfosClient({offer} : OfferInfosClientProps)
{
    return(
        <>
            <h4>{offer.name}</h4>
            <h5>{offer.description}</h5>
            <RichText className="mt-4" data={offer.moreInfo} />
        </>
    )
}