import { CollectionConfig } from "payload";

export const Forms: CollectionConfig = {
    slug: "forms",
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "fields",
            type: 'array',
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true,
                },
                {
                    name: "formID",
                    type: "text",
                    required: true,
                },
                {
                    name: "type",
                    type: "select",
                    options: [
                        {
                            label: "Texte",
                            value: 'text'
                        },
                        {
                            label: "Email",
                            value: 'email'
                        },
                        {
                            label: "Nombre",
                            value: 'number'
                        },
                        {
                            label: "Date",
                            value: 'date'
                        },
                        {
                            label: "Teléphone",
                            value: 'tel'
                        },
                        {
                            label: "Checkbox",
                            value: "checkbox",
                        },
                        {
                            label: "Textarea",
                            value: "textarea"
                        },
                        {
                            label: "Select",
                            value: "select"
                        }
                    ]
                },
                {
                    name: "placeholder",
                    type: "text",
                },
                {
                    name: "options",
                    type: "array",
                    admin: {
                        condition: (_, siblingData) => siblingData.type === "select",
                    },
                    fields: [
                        {
                            name: "optionLabel",
                            type: "text",
                            required: true
                        },
                        {
                            name: "optionValue",
                            type: "text",
                            required: true
                        }
                    ]
                },
                {
                    name: "required",
                    type: "checkbox",
                    label: "Obligatoire ?"
                },
                {
                    name: "defaultValue",
                    type: "text",
                    label: "Valeur par défaut"
                }
            ]
        },
        {
            name: "submitText",
            type: "text",
            required: true,
            defaultValue: "Envoyer"
        },
        {
            name: "successMessage",
            type: 'text',
            required: true
        },
        {
            name: "errorMessage",
            type: "text",
            required: true
        },
        {
            name: "mailTemplates",
            type: "array",
            fields: [
                {
                    name: "mailTemplate",
                    type: "relationship",
                    relationTo: "mails",
                    required: true
                }
            ]
        }
    ]
}