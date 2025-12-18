import React from "react";
import './styles.css'
import { getPayload } from "payload";
import config from '@payload-config';
import OffersPageClient from "./page.client";
import { Offer } from "./_components/OfferInfos/OfferInfos";

const payload = await getPayload({config})

const res = await payload.find({
    collection: "pages", 
    where: {
        slug: {equals: "offers"}
    },
    limit: 1
})

const page = res.docs[0]

export const metadata = {
  title: page.meta?.title || "Découvrez nos offres en fonction de vos besoins"
}

export default async function OffersPage()
{
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