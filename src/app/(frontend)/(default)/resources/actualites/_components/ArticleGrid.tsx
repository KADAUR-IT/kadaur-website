'use client'

import { Article } from "@/payload-types";
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import SearchbarComponent from "./SearchbarComponent";

interface ArticleGridProps
{
    articles : Article[]
}

export default function ArticleGrid({articles}: ArticleGridProps)
{
    const [displayedArticles, setDisplayedArticles] = useState(articles)

    async function handleSearch(stringSearch: string)
    {
        const res = await fetch(`/api/articles?search=${encodeURIComponent(stringSearch)}`);
        const data = await res.json();

        setDisplayedArticles(data.articles)
    }

    return(
        <>
        <SearchbarComponent onSearch={handleSearch} />
        <div className="articles-grid">
            {
                displayedArticles.map( (article) => {
                    return(
                        <ArticleCard key={article.id} article={article} />
                    )
                })
            }
        </div>
        </>
    )
}