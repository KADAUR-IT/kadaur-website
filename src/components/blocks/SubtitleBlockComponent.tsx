import { SubtitleBlock } from "@/payload-types";
import React from "react";
import "./blocks.css"

interface SubtitleBlockProps{
    block: SubtitleBlock
}

export default function SubtitleBlockComponent({block} : SubtitleBlockProps)
{
    return(
        <>
            <h2 className="subtitle-block">{block.text}</h2>
        </>
    )
}