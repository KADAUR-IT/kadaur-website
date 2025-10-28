import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import {CollectionConfig} from "payload"

export const Article: CollectionConfig = {
    slug: "article",
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "slug",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "text",
            required: true
        },
        {
            name: "thumbnail",
            label: "Image de présentation",
            type: "upload",
            relationTo: "media",
            required: true
        },
        {
            name: "text",
            type: "richText",
            editor: lexicalEditor({
                features: ({defaultFeatures}) => [
                    ...defaultFeatures,
                    FixedToolbarFeature()
                ]
            }),
            required: true
        }
    ]
}