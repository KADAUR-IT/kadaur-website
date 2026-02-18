import React from "react";
import "./styles.css";
import "src/styles/pages.css"
import { getPayload } from "payload";
import configPromise from "@payload-config"
import { Article } from "@/payload-types";
import ActualityPageClient from "./page.client";

const payload = await getPayload({config: configPromise})

const res = await payload.find({
    collection: "pages", 
    where: {
        slug: {equals: "resources/actualites"}
    },
    limit: 1
})

const page = res.docs[0]

export const metadata = {
  title: page.meta?.title || "Lisez nos dernière actualités pour ne rien manquer"
}


export default async function ActualityPage()
{
    const payload = await getPayload({config: configPromise})
    var res = await payload.find({
        collection: "article",
        where : {
            _status: { equals: "published" }
        },
        limit: 9
    })

    const articles : Article[] = res.docs

    return(
        <ActualityPageClient intitialArticles={articles} initialPage={res.page || 0} hasNextPage={res.hasNextPage} />
    )
}