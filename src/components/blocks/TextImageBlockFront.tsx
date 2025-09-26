import { TextImageBlock } from "@/payload-types";
import React from "react";
import Image from "next/image";
import "./blocks.css"
import RichText from "../ui/RichText";

interface TextImageBlockProps{
    block: TextImageBlock
}

export default function TextImageBlockFront({block} : TextImageBlockProps)
{
    const classDiv = "text-image-block "
    const reverseClass = block.reverse ? "reverse" : ""
    
    return(
        <div className={classDiv + reverseClass}>
            <RichText data={block.text} />
            <Image 
                src={block.image.url}
                width={block.image.width}
                height={block.image.height}
                alt="Text"
            />
        </div>
    )
}