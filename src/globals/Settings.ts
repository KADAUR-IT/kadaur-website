import { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
    slug: "settings",
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    name: "general",
                    fields : [
                        {
                            type: "array",
                            name: "socialMedia",
                            fields: [
                                {
                                    type: "select",
                                    name: "socialMediaSelect",
                                    label: "Réseau social",
                                    required: true,
                                    options: [
                                        {
                                            label: "Linkedin",
                                            value: "fa-brands fa-linkedin"
                                        },
                                        {
                                            label: "Youtube",
                                            value: "fa-brands fa-youtube"
                                        },
                                        {
                                            label: "X/Twitter",
                                            value: "fa-brands fa-x-twitter"
                                        },
                                        {
                                            label: "Instagram",
                                            value: "fa-brands fa-instagram"
                                        },
                                        {
                                            label: "Facebook",
                                            value: "fa-brands fa-facebook"
                                        },
                                    ]
                                },
                                {
                                    type: "text",
                                    name: "socialMediaLink",
                                    label: "Lien"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "logos",
                    fields : [
                        {
                            type: "upload",
                            relationTo: "media",
                            name: "logo",
                        },
                        {
                            type: "upload",
                            relationTo: "media",
                            name: "logoAlternative",
                        },
                    ]
                },
                {
                    name: "SEO",
                    fields: [
                        {
                            type: "text",
                            name: "title",
                            required: true,
                            defaultValue: "KADAUR"
                        },
                        {
                            type: "text",
                            name: "template",
                            required: true,
                            defaultValue: "KADAUR - %s"
                        },
                        {
                            type: "text",
                            name: "description",
                        },
                        {
                            type: "array",
                            name: "keywords",
                            fields: [
                                {
                                    type: "text",
                                    name: "label"
                                }
                            ]
                        },
                    ]
                },
                {
                    name: "googleAnalytics",
                    fields: [
                        {
                            type: "text",
                            name: "trackingID"
                        }
                    ]
                }
            ]
        }
    ]
}