import { CollectionConfig } from "payload";

export const Mails : CollectionConfig = {
    slug: "mails",
    admin: {
        useAsTitle: "subject",
    },
    fields: [
        {
            name: "subject",
            type: "text",
            required: true,
        },
        {
            name: "htmlContent",
            type: "code",
            required: true,
            admin: {
                language: "html",
            }
        }
    ]

}