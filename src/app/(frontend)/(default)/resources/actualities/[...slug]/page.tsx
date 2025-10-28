import { getPayload } from "payload";
import React from "react";
import configPromise from "@payload-config"
import "./styles.css"
import "src/styles/pages.css"
import Image from "next/image";
import RichText from "@/components/ui/RichText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faPinterest, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export const dynamicParams = true

export default async function ArticlePage({params} : { params: Promise<{ slug: string }> })
{
    const { slug } = await params;
    const payload = await getPayload({ config : configPromise });
    const res = await payload.find({
        collection: "article", 
        where: {
            slug: {equals: slug[0]}
        },
        limit: 1
    })

    const article = res.docs[0]

    const publishedDate = new Date(article.createdAt).toLocaleDateString()

    return(
        <div className="dyn-pages">
            <div className="headtitle">    
                <h1>{article.title}</h1>
                <span className="article-topic">Activité</span>
            </div>
            
            <div className="article-thumbnail-wrapper">
                <Image
                    className="article-thumbnail"
                    alt={article.thumbnail.alt}
                    src={article.thumbnail.url}
                    width={article.thumbnail.width}
                    height={article.thumbnail.height}
                />
                <div className="article-infos">
                    <div className="article-time-author">
                        Publié le {publishedDate} par IKADAUR
                    </div>
                    <div className="article-share">
                        <FontAwesomeIcon icon={faPinterest} />
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faXTwitter} />
                    </div>
                </div>
            </div>

            <RichText data={article.text} />
        </div>
    )

}