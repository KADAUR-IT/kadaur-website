import { Article, Media } from "@/payload-types";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";

interface ArticleCardProps
{
    article : Article
}

export default function ArticleCard({article}: ArticleCardProps)
{
    const thumbnail: Media = article.thumbnail as Media 

    return(
        <a href={"/resources/actualites/" + article.slug} className="article-card">
            <Image
                alt={thumbnail.alt}
                height={thumbnail.height as number}
                src={thumbnail.url as string}
                width={thumbnail.width as number}
                loader={() => thumbnail.url as string}
            />
            <div className="article-info">
                <span className="article-topic">Activité</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
            </div>
        </a>
    )
}