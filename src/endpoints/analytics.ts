import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { google } from '@google-analytics/data/build/protos/protos'
import { PayloadHandler, PayloadRequest } from 'payload'
import { promises as fs } from 'fs'

const analyticsDataClient = new BetaAnalyticsDataClient()

export const getAnalyticsData = async (req: PayloadRequest) => {
  if (!req.user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const globalSettings = await req.payload.findGlobal({
    slug: 'settings',
  })

  if (!globalSettings) {
    return Response.json({ message: 'Global settings not found' }, { status: 404 })
  }

  const propertyId =
    globalSettings.googleAnalytics?.propertyID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!req.json) {
    console.error('Webhook Error: No data')
    return Response.json({ error: 'Webhook Error' }, { status: 400 })
  }

  const body = await req.json()
  //console.log(body)

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: body.dimensions,
      metrics: body.metrics,
      keepEmptyRows: Boolean(body.keepEmptyRows),
      orderBys: body.orderBys,
    })

    return response
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return null
  }
}

export const getViewsAndUsersAnalyticsData: PayloadHandler = async (req) => {
  try {
    const response: google.analytics.data.v1beta.IRunReportResponse | null =
      (await getAnalyticsData(req)) as google.analytics.data.v1beta.IRunReportResponse | null

    if (!response) {
      return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    const data = []
    const daysToFetch = 6

    // 1. Transformer les données de GA4 en un objet facilement consultable
    // Clé: "20260310", Valeur: { users: 0, views: 0 }
    const gaData = response.rows?.reduce(
      (acc, row) => {
        const dateStr = row.dimensionValues?.[0]?.value // ex: "20260310"
        if (dateStr) {
          acc[dateStr] = {
            users: Number(row.metricValues?.[0]?.value || 0),
            views: Number(row.metricValues?.[1]?.value || 0),
          }
        }
        return acc
      },
      {} as Record<string, { users: number; views: number }>,
    )

    // On boucle de J-14 jusqu'à J-0 (aujourd'hui)
    for (let i = daysToFetch; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)

      // Formater pour correspondre à la clé de GA4 (YYYYMMDD)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const gaDateString = `${year}${month}${day}`

      // 3. Fusionner : Si GA4 a la donnée, on la prend. Sinon on force à 0.
      data.push({
        date: d.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }), // Format pour l'axe X du graphique
        users: gaData?.[gaDateString]?.users || 0,
        views: gaData?.[gaDateString]?.views || 0,
      })
    }

    return Response.json({ data, message: 'Analytics endpoint is set up.' })
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

export const getCountriesAnalyticsData: PayloadHandler = async (req) => {
  try {
    const response: google.analytics.data.v1beta.IRunReportResponse | null =
      (await getAnalyticsData(req)) as google.analytics.data.v1beta.IRunReportResponse | null

    if (!response) {
      return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    const countryName = response.rows?.map((row) => row.dimensionValues?.[0].value)

    const geoData = await fs.readFile(process.cwd() + '/src/geojson/custom.geo.json', 'utf8')
    const geoJson = JSON.parse(geoData)
    const countries = geoJson.features.filter((features: any) =>
      countryName?.includes(features.properties.name_long),
    )

    geoJson.features = countries

    const data = response.rows?.map((row) => ({
      country: row.dimensionValues?.[0].value,
      users: row.metricValues?.[0].value,
    }))

    return Response.json({ data, geoData: geoJson, message: 'Analytics endpoint is set up.' })
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}

const formatDimensionDate = (date: string) => {
  const chars = date.split('')
  const year = chars.slice(0, 4).join('')
  const month = chars.slice(4, 6).join('')
  const day = chars.slice(6, 8).join('')
  return new Date(`${year}-${month}-${day}`)
}
