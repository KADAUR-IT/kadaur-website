import { FormBlock } from "@/blocks/FormBlock";
import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
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
            name: "image",
            type: "upload",
            label: "Image de l'offre",
            relationTo: "media",
        },
        {
            name: "description",
            type: "text",
            required: true
        },
        {
            name: "moreInfo",
            label: "Informations complémentaires",
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
            name: "form",
            type: "blocks",
            label: "Formulaire",
            blocks: [FormBlock],
            maxRows: 1
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