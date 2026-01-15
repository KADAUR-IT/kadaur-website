import { Block } from "payload"

export const CTABlock : Block = 
{
    slug: "CTA",
    interfaceName: "CTABlock",
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "subtitle",
            type: "text",
            required: true
        },
        {
            name: "actions",
            type: "array",
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true
                },
                {
                    name: "link",
                    label: "Lien",
                    type: "text",
                    required: true
                }
            ],
            minRows: 1,
            maxRows: 2,
            required: true
        }
    ]
}