import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const RichTextBlock : Block = {
    slug: "RichText",
    interfaceName: "RichTextBlock",
    fields: [
        {
            name: "text",
            type: "richText",
            editor: lexicalEditor({
                features: ({defaultFeatures}) => [
                    ...defaultFeatures,
                    FixedToolbarFeature()
                ]
            }),
            required: true
        }
    ]
}