'use server'

import React from "react";
import "./styles.css";
import "src/styles/pages.css"
import { getPayload } from "payload";
import configPromise from "@payload-config"
import ArticleGrid from "./_components/ArticleGrid";
import { Article } from "@/payload-types";

let articles: Article[] = []

export async function getArticles(): Promise<Article[]> {
    return articles
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