import { Block } from "payload";

export const FormBlock: Block = {
    slug: "Form",
    interfaceName: "FormBlock",
    fields: [
        {
            name: "form",
            type: "relationship",
            relationTo: "forms",
            required: true
        },
        {
            name: "title",
            type: "text",
        }
    ]
}