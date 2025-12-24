import { CollectionConfig } from "payload";

export const Mails : CollectionConfig = {
    slug: "mails",
    admin: {
        useAsTitle: "subject",
    },
    fields: [
        {
            name: "to",
            type: "select",
            hasMany: true,
            options: [
                { label: "Client", value: "client" },
                { label: "Prospect", value: "prospect" },
                { label: "Partenaire", value: "partenaire" },
                { label: "Interne", value: "interne" },
            ],
            required: true,
        },
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