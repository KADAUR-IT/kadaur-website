import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const SubtitleBlock : Block = 
{
    slug: "Subtitle",
    interfaceName: "SubtitleBlock",
    fields: [
        {
            name: "text",
            type: "text",
            required: true
        }
    ]
}