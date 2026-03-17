import type { CollectionConfig } from 'payload'

export const Files: CollectionConfig = {
  slug: 'files',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Uploads',
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    skipSafeFetch: true,
  },
}
