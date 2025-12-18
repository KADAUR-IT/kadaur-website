import React from "react";
import "./styles.css";
import "src/styles/pages.css"
import { getPayload } from "payload";
import configPromise from "@payload-config"
import ArticleGrid from "./_components/ArticleGrid";
import { Article } from "@/payload-types";

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
    const res = await payload.find({
        collection: "article",
        limit: 9
    })

    return(
        <div className="dyn-pages">
            <div className="headtitle">
                <h1>Actualités</h1>
                <h2>Restez à l’écoute de nos dernières actualités</h2>
            </div>

            <ArticleGrid articles={res.docs}/>
        </div>
    )
}