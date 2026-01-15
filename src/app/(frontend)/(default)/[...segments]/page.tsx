import BlockComponent from "@/components/blocks/BlockComponent";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import { notFound } from 'next/navigation'
import "src/styles/pages.css"
import { Metadata, ResolvingMetadata } from "next";
import DynamicClientPage from "./page.client";

const payload = await getPayload({ config : payloadConfig })

export const dynamicParams = true

export async function generateMetadata(
  { params }: { params: Promise<{segments: string[]}> },
  parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const {segments} = await params;
    const slug = segments.join('/')
 
    // fetch data
    const res = await payload.find({
        collection: "pages",
        where: 
        {
            slug: { equals: slug },
        },
        limit: 1
    })

    if(!res.docs.length) notFound();

    const page = res.docs[0]
    
    return {
        title: page.meta?.title || ""
    }
}
 

export default async function AboutPages({ params }: { params: Promise<{segments: string[]}> })
{
    
    const {segments} = await params;
    const slug = segments.join('/')
    
    const res = await payload.find({
        collection: "pages",
        where: 
        {
            slug: { equals: slug },
        },
        limit: 1
    })

    if(!res.docs.length) notFound();

    const page = res.docs[0]

    const blocks = page.block?.map( (block) => {
        return(
            <BlockComponent key={block.id} id={block.id as string} block={block}/>
        )
    } )

    return(
        <DynamicClientPage blocks={blocks} />
    )
}