import { CTABlock } from "@/payload-types";
import React from "react";
import "./blocks.css"
import SectionTitle from "../ui/SectionTitle";
import Link from "../ui/Link";

interface CTABlockProps{
    block: CTABlock
}

export default function CTABlockComponent({block} : CTABlockProps)
{
    const actions = block.actions.map( (action, index) => {
        return(
            <Link linkColor={!index ? "white" : "blue"} className="h-fit" href={action.link}>{action.label}</Link>
        )
    })

    return(
        <>
            <div className="call-to-action-block">
                <div className="call-to-action-text-block">
                    <SectionTitle className="text-[32px]!">{block.title}</SectionTitle>
                    <p>{block.subtitle}</p>
                </div>
                
                <div className="flex w-full gap-[16px]">
                    {actions}
                </div>
    
            </div>
        </>
    )
}