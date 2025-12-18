import { Block } from "payload"

export const SectionTitleBlock : Block = 
{
    slug: "SectionTitle",
    interfaceName: "SectionTitleBlock",
    fields: [
        {
            name: "text",
            type: "text",
            required: true
        }
    ]
}