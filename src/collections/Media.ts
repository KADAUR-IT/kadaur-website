import ImageHandler from '@/utils/singleton/ImageHandler'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Uploads',
    components: {
      beforeListTable: ['@/components/ui/Dashboard/ClearMediaCacheButton'],
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    skipSafeFetch: true,
  },
  endpoints: [
    {
      path: '/clear-custom-cache',
      method: 'post',
      handler: async (req) => {
        try {
          ImageHandler.getInstance(req.payload).getCache().clearCache()

          return Response.json({ message: 'Cache vidé avec succès' }, { status: 200 })
        } catch (error) {
          req.payload.logger.error({ err: error }, 'Erreur lors du vidage du cache')
          return Response.json({ error: 'Erreur lors du vidage du cache' }, { status: 500 })
        }
      },
    },
  ],
}
