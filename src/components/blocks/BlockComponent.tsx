import { Block } from "payload";
import React from "react";
import TitleBlockComponent from "./TitleBlockComponent";
import { CTABlock, DownloadableFileBlock, EnumBlock, FormBlock, QuestionAnswerBlock, QuoteBlock, RichTextBlock, SectionTitleBlock, SubtitleBlock, TextImageBlock, TitleBlock } from "@/payload-types";
import SubtitleBlockComponent from "./SubtitleBlockComponent";
import TextImageBlockFront from "./TextImageBlockFront";
import QuoteBlockComponent from "./QuoteBlockComponent";
import EnumBlockComponent from "./EnumBlockComponent";
import QuestionAnswerBlockComponent from "./QuestionAnswerBlockComponent";
import DownloadableFileBlockComponent from "./DownloadableFileBlockComponent";
import SectionTitleBlockComponent from "./SectionTitleBlockComponent";
import RichTextBlockFront from "./RichTextBlockFront";
import FormBlockComponent from "./FormBlockComponent";
import CTABlockComponent from "./CTABlockComponent";

interface BlockProps{
    block: TitleBlock | SubtitleBlock | TextImageBlock | QuoteBlock | EnumBlock | QuestionAnswerBlock | DownloadableFileBlock | SectionTitleBlock | RichTextBlock | FormBlock | CTABlock,
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
        case "DownloadableFile":
            blockRender.push(<DownloadableFileBlockComponent key={id} block={block as DownloadableFileBlock} />)
            break;
        case "SectionTitle":
            blockRender.push(<SectionTitleBlockComponent key={id} block={block as SectionTitleBlock} />)
            break
        case "RichText":
            blockRender.push(<RichTextBlockFront key={id} block={block as RichTextBlock}/>)
            break;
        case "Form":
            blockRender.push(<FormBlockComponent key={id} block={block as FormBlock} />)
            break;
        case "CTA":
            blockRender.push(<CTABlockComponent key={id} block={block as CTABlock} />)
            break;
        default:
            blockRender.push(<></>)
            break;
    }

    return(
        <>
        {blockRender}
        </>
    )
}