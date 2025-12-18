import { CollectionConfig } from "payload";

export const Leads : CollectionConfig = {
    slug: "leads",
    fields: [
        {
            type: "text",
            name: "name",
            required: true,
            
        },
        {
            type: "text",
            name: "entreprise",
            required: true
        },
        {
            type: "text",
            name: "mail",
            required: true
        },
    ], 
    //Intégrer hooks pour HubSpot lors de la création de leads
}