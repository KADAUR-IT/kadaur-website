import React from "react";
import UniqueSellingPoint from "../UniqueSellingPoint";
import { Offer, USP } from "./OfferInfos";

interface OfferInfosClientProps
{
    offer: Offer
}

export default function OfferInfosClient({offer} : OfferInfosClientProps)
{
    const usps = offer.usp as USP[]

    const uspList = usps.map( (usp) => {
        return (
            <UniqueSellingPoint key={usp.id}>{usp.label}</UniqueSellingPoint>
        )
    } )

    return(
        <>
            <h4>{offer.name}</h4>
            <p>{offer.description}</p>
            <div className="offer-usps">
                {uspList}
            </div>
            {offer.extraActionButtonLabel ? <button className="extra-action-button">{offer.extraActionButtonLabel}</button> : "" }
        </>
    )
}