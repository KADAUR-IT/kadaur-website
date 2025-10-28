import { Block } from "payload";
import React from "react";
import TitleBlockComponent from "./TitleBlockComponent";
import { EnumBlock, QuestionAnswerBlock, QuoteBlock, SubtitleBlock, TextImageBlock, TitleBlock } from "@/payload-types";
import SubtitleBlockComponent from "./SubtitleBlockComponent";
import TextImageBlockFront from "./TextImageBlockFront";
import QuoteBlockComponent from "./QuoteBlockComponent";
import EnumBlockComponent from "./EnumBlockComponent";
import QuestionAnswerBlockComponent from "./QuestionAnswerBlockComponent";

interface BlockProps{
    block: TitleBlock | SubtitleBlock | TextImageBlock | QuoteBlock | EnumBlock | QuestionAnswerBlock,
    id: string
}

export default function BlockComponent({block, id} : BlockProps)
{
    let blockRender = [];

    switch(block.blockType){
        case "Title":
            blockRender.push(<TitleBlockComponent key={id} block={block as TitleBlock} />)
            break;
        case "Subtitle":
            blockRender.push(<SubtitleBlockComponent key={id} block={block as SubtitleBlock} />)
            break;
        case "TextImage":
            blockRender.push(<TextImageBlockFront key={id} block={block as TextImageBlock} />)
            break;
        case "Quote":
            blockRender.push(<QuoteBlockComponent key={id} block={block as QuoteBlock} />)
            break;
        case "Enum":
            blockRender.push(<EnumBlockComponent key={id} block={block as EnumBlock} />)
            break;
        case "QuestionAnswer":
            blockRender.push(<QuestionAnswerBlockComponent key={id} block={block as QuestionAnswerBlock} />)
            break;
    }

    return(
        <>
        {blockRender}
        </>
    )
}