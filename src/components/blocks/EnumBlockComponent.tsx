import React from "react";
import "./blocks.css"
import { EnumBlock, Media } from "@/payload-types";
import Image from "next/image";
import RichText from "../ui/RichText";

interface EnumBlockProps
{
    block: EnumBlock
}

export default function EnumBlockComponent({block}: EnumBlockProps)
{
    const array = block.items
    const itemsRender = array?.map( (item) => {

        const image = item.image as Media
        return(
            <div key={item.id} className="item-enum-block">
                {item.image ?
                <Image
                    alt={image.alt}
                    src={image.url as string}
                    height={image.height as number}
                    width={image.width as number}
                />
                : ""}
                <RichText data={item.text} />
            </div>
        )
    })

    return(
        <div className="enum-block">
            {itemsRender}
        </div>
    )
}