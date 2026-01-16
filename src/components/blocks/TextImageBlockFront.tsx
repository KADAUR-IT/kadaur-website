"use client"

import { Media, TextImageBlock } from "@/payload-types";
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

    const image = block.image as Media
    
    return(
        <div id={block.blockName || ""} className={classDiv + reverseClass}>
            <RichText data={block.text} />
            <Image 
                src={image.url as string}
                width={image.width as number}
                height={image.height as number}
                alt={image.alt}
                loader={() => image.url as string}
            />
        </div>
    )
}