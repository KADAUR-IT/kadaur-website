import TextImageBlockFront from "@/components/blocks/TextImageBlockFront";
import React from "react";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import BlockComponent from "@/components/blocks/BlockComponent";

export default async function TestPage()
{

    const payload = await getPayload({ config : payloadConfig })
    const res = await payload.find({
        collection: "pages"
    })

    const blocks = res.docs[0].block?.map( (block) => {
        return(
            <BlockComponent key={block.id} id={block.id as string} block={block}/>
        )
    } )

    return(
        <>
        {blocks}
        </>
    )
}