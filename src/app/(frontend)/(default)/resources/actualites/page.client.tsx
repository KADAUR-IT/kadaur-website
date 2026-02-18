"use client"

import React, { useState } from "react";
import ArticleGrid from "./_components/ArticleGrid";
import { Article } from "@/payload-types";
import Button from "@/components/ui/Button";
import { fetchMoreArticles } from "./_actions/articlesActions";

interface ActualityPageClientProps
{
    intitialArticles: Article[],
    initialPage: number,
    hasNextPage: boolean,
}

export default function ActualityPageClient({intitialArticles, initialPage, hasNextPage} : ActualityPageClientProps)
{
    const [articles, setArticles] = useState<Article[]>(intitialArticles)
    const [page, setPage] = useState<number>(initialPage)
    const [hasMore, setHasMore] = useState<boolean>(hasNextPage);

    const handleMoreArticles = async () => {
        if(!hasMore) return;
        const res = await fetchMoreArticles(page + 1)
        setArticles([...articles, ...res.docs])
        setPage(page + 1)
        setHasMore(res.hasNextPage)
    }

    return(
        <div className="dyn-pages">
            <div className="headtitle">
                <h1>Actualités</h1>
                <h2>Restez à l’écoute de nos dernières actualités</h2>
            </div>

            <ArticleGrid articles={articles}/>
            {hasMore &&<Button onClick={async () => await handleMoreArticles()}>Voir plus d'articles</Button> }
        </div>
    )
}