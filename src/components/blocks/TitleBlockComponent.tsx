import { TitleBlock } from "@/payload-types";
import React from "react";
import "./blocks.css"

interface TitleBlockProps{
    block: TitleBlock
}

export default function TitleBlockComponent({block} : TitleBlockProps)
{
    return(
        <>
            <h1 id={block.blockName || ""} className="title-block">{block.text}</h1>
        </>
    )
}