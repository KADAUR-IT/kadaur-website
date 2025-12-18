import { Block } from "payload"
import { lexicalEditor , FixedToolbarFeature} from "@payloadcms/richtext-lexical"

export const EnumBlock : Block = 
{
    slug: "Enum",
    interfaceName: "EnumBlock",
    fields: 
    [
        {
            name: "items",
            type: "array",
            fields :[
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
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media"
                }
            ]
        }
    ]
    
}