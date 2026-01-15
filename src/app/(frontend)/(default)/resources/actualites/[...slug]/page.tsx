import { getPayload } from "payload";
import React from "react";
import configPromise from "@payload-config"
import "./styles.css"
import "src/styles/pages.css"
import { Media } from "@/payload-types";

import { Metadata, ResolvingMetadata } from "next";
import ArticleClientPage from "./page.client";

const payload = await getPayload({ config : configPromise });

export const dynamicParams = true

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const {slug} = await params;
 
    // fetch data
    const res = await payload.find({
        collection: "article", 
        where: {
            slug: {equals: slug[0]}
        },
        limit: 1
    })

    const page = res.docs[0]
    
    return {
        title: page.meta?.title || ""
    }
}

export default async function ArticlePage({params} : { params: Promise<{ slug: string }> })
{
    const { slug } = await params;
    
    const res = await payload.find({
        collection: "article", 
        where: {
            slug: {equals: slug[0]}
        },
        limit: 1
    })

    const resOtherArticles = await payload.find({
        collection: "article",
        where: {
            slug: {not_equals: slug[0]},
            _status : {equals: "published"}
        },
        limit: 3,
    })

    const article = res.docs[0]

    const otherArticle = resOtherArticles.docs

    const publishedDate = new Date(article.createdAt).toLocaleDateString()

    const thumbnail: Media = article.thumbnail as Media

    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/resources/actualites/${article.slug}`

    return(
        <ArticleClientPage article={article} otherArticle={otherArticle} publishedDate={publishedDate} thumbnail={thumbnail} url={url} />
    )

}