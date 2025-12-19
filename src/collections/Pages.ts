import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"
import { CollectionConfig} from "payload"
import { TextImageBlock } from "@/blocks/TextImageBlock"
import { TitleBlock } from "@/blocks/TitleBlock"
import { QuoteBlock } from "@/blocks/QuoteBlock"
import { EnumBlock } from "@/blocks/EnumBlock"
import { SubtitleBlock } from "@/blocks/SubtitleBlock"
import { QuestionAnswerBlock } from "@/blocks/QuestionAnswerBlock"
import { DownloadableFileBlock } from "@/blocks/DownloadableFileBlock"
import { SectionTitleBlock } from "@/blocks/SectionTitleBlock"
import { RichTextBlock } from "@/blocks/RichTextBlock"
import { FormBlock } from "@/blocks/FormBlock"

export const Pages : CollectionConfig = 
{
    slug: "pages",
    admin: {
        useAsTitle: 'title',
        
    },
    fields: [
        {
            name: "title",
            label: "Titre",
            type: "text",
            required: true
        },
        {
            name: "slug",
            label: "URL",
            type: "text",
            required: true,
            unique: true
        },
        {
            name: "seoOnly",
            type: "checkbox",
            label: "SEO seulement ?"
        },
        {
            name: "block",
            type: "blocks",
            admin: {
                condition: (_, siblingData) => !siblingData.seoOnly,
            },
            blocks: [TextImageBlock, TitleBlock, QuoteBlock, EnumBlock, SubtitleBlock, QuestionAnswerBlock, DownloadableFileBlock, SectionTitleBlock, RichTextBlock, FormBlock]
        },
        {
            name: "partnerToShow",
            type: "array",
            admin: {
                condition: (_, siblingData) => siblingData.slug === "/",
            },
            fields: [
                {
                    type: 'text',
                    name: "partnerName",
                    required: true
                },
                {
                    type: "upload",
                    relationTo: "media",
                    name: "partnerLogo",
                    required: true
                }
            ]
        },
        {
            name: "avisToShow",
            type: "array",
            admin: {
                condition: (_, siblingData) => siblingData.slug === "/",
            },
            fields: [
                {
                    type: 'text',
                    name: "avisName",
                    required: true
                },
                {
                    type: 'text',
                    name: "jobTitleAvis"
                },
                {
                    type: 'number',
                    name: "avisRating",
                    min: 0,
                    max: 5,
                    admin : {
                        step: 0.5
                    },
                    required: true
                },
                {
                    type: "text",
                    name: "avisText",
                    required: true
                }
            ]
        },
        {
            name: "form",
            type: "blocks",
            admin: {
                condition: (_, siblingData) => siblingData.slug === "contact" || siblingData.slug === "offers",
            },
            blocks: [FormBlock]
        }
    ]
}