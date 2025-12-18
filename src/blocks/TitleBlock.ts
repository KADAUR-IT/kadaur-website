import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const TitleBlock : Block = 
{
    slug: "Title",
    interfaceName: "TitleBlock",
    fields: [
        {
            name: "text",
            type: "text",
            required: true
        },
        {
            name: "header",
            type: "upload",
            relationTo: "media"
        }
    ]
}