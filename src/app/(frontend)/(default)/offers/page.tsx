import React from "react";
import './styles.css'
import { getPayload } from "payload";
import config from '@payload-config';
import OffersPageClient from "./page.client";
import { Offer } from "./_components/OfferInfos/OfferInfos";

export default async function OffersPage()
{
    const payload = await getPayload({ config });
    const res = await payload.find(
        {
            collection: "offers",
            limit: 4,
        }
    );

    const offers = res.docs.reverse()

    return (
        <>
            <OffersPageClient offers={offers as Offer[]} />
        </>
    )
}