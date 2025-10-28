import { jwtSign, type CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access:{
    read: () => true,
  },
  auth: {
    verify: false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "firstName",
      type: "text",
      required: true,

    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true
    },
    {
      name: "token",
      type: "group",
      fields: [
        {
          name: "hash",
          type: "text"
        },
        {
          name: "salt",
          type: "text"
        },
        {
          name: "expiresAt",
          type: "number"
        },
      ],
      admin: {
        readOnly: true
      }
    }
  ],
  /*hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (data.token.hash === null) {
          delete data.token;
        }
        return data
      }
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if(operation === "update")
        {
          if(!doc.token.hash)
          {
            await req.payload.db.collections.users.updateOne(
              {_id: doc.id},
              { $unset: { token: ""} }
            );
          }

          return doc;
        }
      }
    ]
  }*/
}
