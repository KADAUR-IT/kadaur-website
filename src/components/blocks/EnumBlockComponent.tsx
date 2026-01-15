"use client"

import React, { useState } from "react";
import "./blocks.css"
import { EnumBlock, Media } from "@/payload-types";
import Image from "next/image";
import RichText from "../ui/RichText";
import Button from "../ui/Button";

interface EnumBlockProps
{
    block: EnumBlock
}

export default function EnumBlockComponent({block}: EnumBlockProps)
{
    const array = block.items
    const [openStates, setOpenStates] = useState<boolean[]>(Array(array?.length).fill(false));

    const toggleMoreText = (index: number) => {
        setOpenStates(openStates.map((state, i) => i === index ? !state : state));
    }

    const itemsRender = array?.map( (item, index) => {

        const image = item.image as Media
        return(
            <div key={item.id} className="item-enum-block">
                {item.image ?
                <Image
                    alt={image.alt}
                    src={image.url as string}
                    height={image.height as number}
                    width={image.width as number}
                    loader={() => image.url as string}
                />
                : ""}
                <RichText data={item.text} />
                { item.moreText && 
                    <>
                    <RichText className={openStates[index] ? "visible" : "hidden"} data={item.moreText} />
                    <Button onClick={() => toggleMoreText(index)}>{openStates[index] ? "Réduire" : "En savoir plus"}</Button>
                    </>
                }
            </div>
        )
    })

    return(
        <div className="enum-block">
            {itemsRender}
        </div>
    )
}