import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"
import { CollectionConfig} from "payload"
import { TextImageBlock } from "@/blocks/TextImageBlock"
import { TitleBlock } from "@/blocks/TitleBlock"
import { QuoteBlock } from "@/blocks/QuoteBlock"
import { EnumBlock } from "@/blocks/EnumBlock"
import { SubtitleBlock } from "@/blocks/SubtitleBlock"

export const Pages : CollectionConfig = 
{
    slug: "pages",
    fields: [
        {
            name: "slug",
            label: "URL",
            type: "text",
            required: true
        },
        {
            name: "block",
            type: "blocks",
            blocks: [TextImageBlock, TitleBlock, QuoteBlock, EnumBlock, SubtitleBlock]
        },
        {
            name: "test",
            type: "richText",
            editor: lexicalEditor({
                features: ({defaultFeatures}) => [
                    ...defaultFeatures,
                    FixedToolbarFeature()
                ]
            })
        }
    ]
}