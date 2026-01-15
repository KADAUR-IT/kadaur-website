import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import {CollectionConfig} from "payload"

export const Article: CollectionConfig = {
    slug: "article",
    admin: {
        useAsTitle: 'title',
    },
    versions : {
        drafts: {
            schedulePublish: true,
        }
    },
    fields: [
        {
            name: "title",
            type: "text",
            maxLength: 75,
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
            maxLength: 165,
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
            name: "author",
            type: "relationship",
            relationTo: "admins",
            required: true,
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