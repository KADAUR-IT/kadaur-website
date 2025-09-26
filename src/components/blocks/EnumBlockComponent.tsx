import React from "react";
import "./blocks.css"
import { EnumBlock } from "@/payload-types";
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
        return(
            <div key={item.id} className="item-enum-block">
                {item.image ?
                <Image
                    alt={item.image.alt}
                    src={item.image.url}
                    height={item.image.height}
                    width={item.image.width}
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