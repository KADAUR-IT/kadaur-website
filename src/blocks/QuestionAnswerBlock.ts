import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const QuestionAnswerBlock : Block = {
    slug: "QuestionAnswer",
    interfaceName: "QuestionAnswerBlock",
    fields: [
        {
            name: "question",
            type: "text",
            required: true
        },
        {
            name: "answer",
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
            name: "icon",
            type: "text",
            required: true
        }
    ]
}