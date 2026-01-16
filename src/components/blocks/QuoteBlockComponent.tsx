import React from "react";
import RichText from "../ui/RichText";
import { QuoteBlock } from "@/payload-types";
import "./blocks.css"

interface QuoteBlockProps{
    block: QuoteBlock
}

export default function QuoteBlockComponent({block}: QuoteBlockProps)
{
    return(
        <div id={block.blockName || ""}>
            <RichText className="quote-block" data={block.text} />
        </div>
    )
}