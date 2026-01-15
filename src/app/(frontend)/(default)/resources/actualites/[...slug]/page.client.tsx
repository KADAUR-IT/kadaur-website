"use client"

import React from "react";
import ArticlePage from "./page";
import { Article, Media } from "@/payload-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faFacebook, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import RichText from "@/components/ui/RichText";
import ArticleCard from "../_components/ArticleCard";

interface ArticleClientPageProps
{
    article : Article,
    thumbnail: Media,
    otherArticle : Article[],
    publishedDate : string,
    url : string
}

export default function ArticleClientPage({article, thumbnail, otherArticle, publishedDate, url} : ArticleClientPageProps)
{
    return(
        <div className="dyn-pages">
            <Link href={"/resources/actualites"} className="text-(--color-blue)">
                <FontAwesomeIcon icon={faChevronLeft} /> Retour
            </Link>

            <div className="headtitle">    
                <h1>{article.title}</h1>
                <span className="article-topic">Activité</span>
            </div>
            
            <div className="article-thumbnail-wrapper">
                <Image
                    className="article-thumbnail"
                    alt={thumbnail.alt}
                    src={thumbnail.url as string}
                    width={thumbnail.width as number}
                    height={thumbnail.height as number}
                    loader={() => thumbnail.url as string}
                />
                <div className="article-infos">
                    <div className="article-time-author">
                        Publié le {publishedDate} par IKADAUR
                    </div>
                    <div className="article-share">
                        <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link href={`https://twitter.com/intent/tweet?url=${url}&text=${article.title}`} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} />
                        </Link>
                    </div>
                </div>
            </div>

            <RichText data={article.text} />

            <div className="w-full">
                <h2 className="text-center">Autre articles</h2>
                <div className="flex w-full justify-between">
                    {
                        otherArticle.map( (article) => {
                            return(
                                <ArticleCard key={article.id} article={article} />
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}