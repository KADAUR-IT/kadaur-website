import { getCountriesAnalyticsData, getViewsAndUsersAnalyticsData } from '@/endpoints/analytics'
import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          fields: [
            {
              type: 'group',
              name: 'logos',
              label: 'Logos',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'upload',
                      relationTo: 'media',
                      name: 'logo',
                    },
                    {
                      type: 'upload',
                      relationTo: 'media',
                      name: 'logoAlternative',
                    },
                  ],
                },
              ],
            },

            {
              type: 'array',
              name: 'socialMedia',
              fields: [
                {
                  type: 'select',
                  name: 'socialMediaSelect',
                  label: 'Réseau social',
                  required: true,
                  options: [
                    {
                      label: 'Linkedin',
                      value: 'fa-brands fa-linkedin',
                    },
                    {
                      label: 'Youtube',
                      value: 'fa-brands fa-youtube',
                    },
                    {
                      label: 'X/Twitter',
                      value: 'fa-brands fa-x-twitter',
                    },
                    {
                      label: 'Instagram',
                      value: 'fa-brands fa-instagram',
                    },
                    {
                      label: 'Facebook',
                      value: 'fa-brands fa-facebook',
                    },
                  ],
                },
                {
                  type: 'text',
                  name: 'socialMediaLink',
                  label: 'Lien',
                },
              ],
            },
          ],
        },
        {
          name: 'SEO',
          label: 'SEO',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Titre',
              required: true,
              defaultValue: 'KADAUR',
            },
            {
              type: 'text',
              name: 'template',
              required: true,
              defaultValue: 'KADAUR - %s',
            },
            {
              type: 'text',
              name: 'description',
            },
            {
              type: 'array',
              name: 'keywords',
              label: 'Mots-clés',
              fields: [
                {
                  type: 'text',
                  name: 'label',
                },
              ],
            },
          ],
        },
        {
          name: 'googleAnalytics',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'trackingID',
                  label: 'Tracking ID',
                  required: true,
                },
                {
                  type: 'text',
                  name: 'propertyID',
                  label: 'Property ID',
                  required: true,
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  type: 'ui',
                  name: 'analytics',
                  admin: {
                    components: {
                      Field: 'src/components/ui/Dashboard/AnalyticsWidget#AnalyticsWidget',
                    },
                  },
                },
                {
                  type: 'ui',
                  name: 'analytics2',
                  admin: {
                    components: {
                      Field:
                        'src/components/ui/Dashboard/MapUserAnalyticsWidget#MapsUserAnalyticsWidget',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'livreBlanc',
          fields: [
            {
              type: 'upload',
              relationTo: 'files',
              name: 'file',
              label: 'Fichier',
              required: true,
            },
            {
              type: 'array',
              name: 'summaryItems',
              label: 'Sommaire',
              fields: [
                {
                  type: 'text',
                  name: 'title',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  endpoints: [
    {
      path: '/analytics/views-and-users',
      method: 'post',
      handler: getViewsAndUsersAnalyticsData,
    },
    {
      path: '/analytics/country',
      method: 'post',
      handler: getCountriesAnalyticsData,
    },
  ],
}
