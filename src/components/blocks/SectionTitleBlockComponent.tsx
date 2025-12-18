import { SectionTitleBlock } from "@/payload-types";
import React from "react";
import "./blocks.css"

interface SectionTitleBlockProps{
    block: SectionTitleBlock
}

export default function SectionTitleBlockComponent({block} : SectionTitleBlockProps)
{
    return(
        <>
            <h3>{block.text}</h3>
        </>
    )
}