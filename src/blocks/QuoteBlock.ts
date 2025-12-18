import { Block } from "payload"
import { lexicalEditor} from "@payloadcms/richtext-lexical"

export const QuoteBlock : Block = 
{
    slug: "Quote",
    interfaceName: "QuoteBlock",
    fields: [
        {
            name: "text",
            type: "richText",
            editor: lexicalEditor(),
            required: true
        }
    ]
}