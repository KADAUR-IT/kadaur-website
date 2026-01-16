import { RichTextBlock } from "@/payload-types";
import React from "react";
import "./blocks.css"
import RichText from "../ui/RichText";

interface RichTextBlockProps{
    block: RichTextBlock
}

export default function RichTextBlockFront({block} : RichTextBlockProps)
{
    const classDiv = "rich-text-block "
    
    return(
        <div id={block.blockName || ""} className={classDiv}>
            <RichText data={block.text} />
        </div>
    )
}