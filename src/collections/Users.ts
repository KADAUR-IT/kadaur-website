import { CollectionConfig } from 'payload'
import { withUsersCollection } from "payload-auth-plugin/collection";
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
import { Accounts } from '@/collections/Accounts'
import { adminAuthClient } from '@/utils/auth/auth';
import { headers } from 'next/headers';

export const Users: CollectionConfig = withUsersCollection({
  slug: "users",
  admin: {
    defaultColumns: ['fullName', 'email'],
    useAsTitle: 'email',
  },
  /*access: {
    read: async () => {
      const session = await adminAuthClient.getSession(
        { 
          headers: await headers()
        }
      )

      if(session.isError) return false;

      //@ts-ignore
      const user = session.data.user;

      if (!user) return false;

      return {
        id: {
          equals: user.id,
        },
      };
    },
  },*/
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'lastName',
      label: 'Nom',
      type: 'text',
    },
    {
      name: 'firstName',
      label: 'Prénom',
      type: 'text',
    },
  ],
  timestamps: true,
  hooks: {
      afterDelete: [deleteLinkedAccounts(Accounts.slug)],
  },
})
