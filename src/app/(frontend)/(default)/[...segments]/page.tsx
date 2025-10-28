import BlockComponent from "@/components/blocks/BlockComponent";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import { notFound } from 'next/navigation'
import "src/styles/pages.css"

export const dynamicParams = true

export default async function AboutPages({ params }: { params: Promise<{segments: string[]}> })
{
    
    const {segments} = await params;
    const slug = segments.join('/')
    const payload = await getPayload({ config : payloadConfig })
    const res = await payload.find({
        collection: "pages",
        where: 
        {
            slug: { equals: slug },
        },
        limit: 1
    })

    if(!res.docs.length) notFound()

    const blocks = res.docs[0].block?.map( (block) => {
        return(
            <BlockComponent key={block.id} id={block.id as string} block={block}/>
        )
    } )

    return(
        <div className="dyn-pages">
            {blocks}
        </div>
    )
}