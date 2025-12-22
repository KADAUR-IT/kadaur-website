import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    /*{
      name: "password",
      type: "text",
      hidden: true,
      required: true,
    },*/
  ],
  access: {
    create: async ({req}) => {
      return req.user?.collection === 'admins'
    }
  }
}