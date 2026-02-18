// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { authPlugin } from 'payload-auth-plugin'
import { PasswordProvider } from 'payload-auth-plugin/providers'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Offers } from './collections/Offers'
import { Pages } from './collections/Pages'
import { Article } from './collections/Article'
import { Admins } from './collections/Admins'
import { CV } from './collections/CV'
import { Accounts } from './collections/Accounts'
import { Settings } from './globals/Settings'
import { Linktree } from './globals/Linktree'
import { NavbarLinks } from './globals/NavbarLinks'
import { Files } from './collections/Files'
import { Leads } from './collections/Leads'
import { Forms } from './collections/Forms'
import { Mails } from './collections/Mails'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/preview/mails/${data.id}`,
      collections: ['mails'],
    },
    components: {
      graphics: {
        // @ts-ignore: Type '() => React.JSX.Element' is not assignable to type 'CustomComponent<Record<string, any>> | undefined'.
        //Logo : "@/components/constants/LogoAdmin",
        // @ts-ignore: Type '() => React.JSX.Element' is not assignable to type 'CustomComponent<Record<string, any>> | undefined'.
        //Icon : '@/components/constants/Icon'
      },
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Users,
    Accounts,
    Media,
    Offers,
    Pages,
    Article,
    Admins,
    CV,
    Files,
    Leads,
    Forms,
    Mails,
  ],
  globals: [Settings, Linktree, NavbarLinks],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      maxPoolSize: process.env.ENVIRONMENT === 'development' ? 1 : 10,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['pages', 'article'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title}`,
    }),
    authPlugin({
      name: 'user',
      allowOAuthAutoSignUp: true,
      usersCollectionSlug: Users.slug,
      accountsCollectionSlug: Accounts.slug,
      successRedirectPath: '/dashboard',
      errorRedirectPath: '/register',
      providers: [
        PasswordProvider({
          emailTemplates: {
            forgotPassword: false,
          },
        }),
      ],
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        files: true,
      },
      token: process.env.KADAUR_BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'hello@kadaur.com',
    defaultFromName: 'KADAUR',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
})
