import { getPayload } from "payload";
import React from "react";
import configPromise from "@payload-config"
import "./styles.css"
import "src/styles/pages.css"
import Image from "next/image";
import RichText from "@/components/ui/RichText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faPinterest, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Media } from "@/payload-types";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import ArticleCard from "../_components/ArticleCard";

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
            slug: {not_equals: slug[0]}
        },
        limit: 3,
    })

    const article = res.docs[0]

    const otherArticle = resOtherArticles.docs

    const publishedDate = new Date(article.createdAt).toLocaleDateString()

    const thumbnail: Media = article.thumbnail as Media

    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/resources/actualites/${article.slug}`

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