import { CollectionConfig } from "payload";
import { withAccountCollection } from 'payload-auth-plugin/collection'
import { Users } from "@/collections/Users";

export const Accounts: CollectionConfig = withAccountCollection(
  {
    slug: "accounts",
  },
  "users"
);