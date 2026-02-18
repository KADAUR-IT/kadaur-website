'use client'

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Offer } from "@/payload-types";

library.add(fas)

interface OfferSliderButtonProps
{
    isActive?: boolean
    offer: Offer
    handler: (id : string) => void
    ref?: React.Ref<HTMLAnchorElement>
}

export default function OfferSliderButton({isActive = false, offer, handler, ref} : OfferSliderButtonProps)
{
    return (
        <a ref={ref} id={offer.id + "-btn"} href={"#" + offer.name.replaceAll(" ", "-").toLowerCase()} className={isActive ? "active" : ""} onClick={(e) => { e.preventDefault(), handler(offer.id)}}>
            <div className={`offer-icon blue`}>
                <FontAwesomeIcon icon={["fas", offer.icon as IconName]} />
            </div>
            <h3>{offer.name}</h3>
        </a>
    )
}