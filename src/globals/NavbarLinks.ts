import type { GlobalConfig } from "payload";

export const NavbarLinks : GlobalConfig = {
    slug : "navbarLinks",
    access : {
        read : () => true
    },
    fields: [
        {
            name : "links",
            type : 'array',
            fields : [
                {
                    name: "label",
                    type: "text",
                    required : true
                },
                {
                    name: "link",
                    type: "text"
                },
                {
                    name: "isButton",
                    type: "checkbox"
                },
                {
                    name: "subLinks",
                    type: 'array',
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            required : true
                        },
                        {
                            name: "link",
                            type: "text"
                        },
                        {
                            name: "isButton",
                            type: "checkbox"
                        }
                    ]
                }
            ]
        }
    ]
}