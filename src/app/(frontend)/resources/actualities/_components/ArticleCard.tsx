import { Article } from "@/payload-types";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";

interface ArticleCardProps
{
    article : Article
}

export default function ArticleCard({article}: ArticleCardProps)
{
    function handleClick()
    {
        redirect("/resources/actualities/" + article.slug)
    }

    return(
        <div className="article-card" onClick={handleClick}>
            <Image
                alt={article.thumbnail.alt}
                height={article.thumbnail.height}
                src={article.thumbnail.url}
                width={article.thumbnail.width}
            />
            <div className="article-info">
                <span className="article-topic">Activité</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
            </div>
        </div>
    )
}