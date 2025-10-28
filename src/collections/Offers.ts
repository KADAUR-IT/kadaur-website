import type { CollectionConfig } from "payload";

export const Offers : CollectionConfig = {
    slug : "offers",
    admin: {
        useAsTitle: 'name',
    },
    access : {
        read : () => true,
    },
    fields: [
        {
            name: "name",
            type: "text",
            label: "Nom",
            required: true
        },
        {
            name: "icon",
            type: "text",
            label: "Icône",
            required: true
        },
        {
            name: "description",
            type: "textarea"
        }, 
        {
            name: "usp",
            label: "Unique Selling Points",
            type: "array", 
            fields: [
                {
                    name: "label",
                    type: "text"
                }
            ]
        }, 
        {
            type: 'row',
            fields: 
            [
                {
                    name: "extraActionButtonLabel",
                    label: "Extra Action Button",
                    type: "text"
                },
                {
                    name: "extraActionButtonUrl",
                    label: "Extra Action Link",
                    type: "text"
                }
            ]
        }
    ]
}