import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const TextImageBlock : Block = {
    slug: "TextImage",
    interfaceName: "TextImageBlock",
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
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "reverse",
            type: "checkbox"
        }
    ]
}