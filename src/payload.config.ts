// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import {seoPlugin} from '@payloadcms/plugin-seo'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Offers } from './collections/Offers'
import { NavbarLinks } from './collections/NavbarLinks'
import { Pages } from './collections/Pages'
import { Article } from './collections/Article'
import { Admins } from './collections/Admins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Offers, NavbarLinks, Pages, Article, Admins],
  editor: lexicalEditor({
    features: ({defaultFeatures}) => [
      ...defaultFeatures,
      FixedToolbarFeature()
    ]
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ["pages"],
      uploadsCollection: "media",
      generateTitle: ({doc}) => `KADAUR - ${doc.title}`
    })
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: "hello@kadaur.com",
    defaultFromName: "KADAUR",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    }
  }),
})
