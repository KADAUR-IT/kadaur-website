import { GlobalConfig } from "payload";

export const Linktree: GlobalConfig = {
    slug: "linktree",
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    name: "socialMedia",
                    fields: [
                        {
                            type: "array",
                            name: "socialMediaArray",
                            fields: [
                                {
                                    type: "select",
                                    name: "socialMedia",
                                    options: 
                                    [
                                        "YouTube", "Facebook", "X", "Instagram", "Linkedin"
                                    ]
                                },
                                {
                                    type: "text",
                                    name: "link"
                                },
                            ]
                        }
                    ]
                },
                {
                    name: "links",
                    fields: [
                        {
                            type: "array",
                            name: "linksArray",
                            fields: [
                                {
                                    type: "text",
                                    name: "label"
                                },
                                {
                                    type: "text",
                                    name: "link"
                                },
                                {
                                    type: "upload",
                                    relationTo: "media",
                                    name: "image"
                                },
                                {
                                    type: "checkbox",
                                    name: "isLarge"
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}