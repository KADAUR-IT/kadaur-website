import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { google } from '@google-analytics/data/build/protos/protos'
import { PayloadHandler, PayloadRequest } from 'payload'
import { promises as fs } from 'fs'
import fsSync from 'fs'
import path from 'path'

function getAnalyticsDataClient(): BetaAnalyticsDataClient {
  const options: Record<string, any> = {}

  // 1. Prioritize separate client email & private key env vars (Best practice on Vercel)
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    options.credentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
    return new BetaAnalyticsDataClient(options)
  }

  // 2. Check for GOOGLE_APPLICATION_CREDENTIALS / GOOGLE_CREDENTIALS_JSON (Raw JSON string or Base64 or path)
  const rawCreds =
    process.env.GOOGLE_CREDENTIALS_JSON ||
    process.env.GOOGLE_CREDENTIALS ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (rawCreds) {
    const trimmed = rawCreds.trim()

    // A: Inline JSON string
    if (trimmed.startsWith('{')) {
      try {
        const parsed = JSON.parse(trimmed)
        options.credentials = {
          client_email: parsed.client_email,
          private_key: parsed.private_key?.replace(/\\n/g, '\n'),
        }
        return new BetaAnalyticsDataClient(options)
      } catch (e) {
        console.error('Failed to parse Google credentials JSON string from environment variable', e)
      }
    }

    // B: Base64 encoded JSON string
    try {
      const decoded = Buffer.from(trimmed, 'base64').toString('utf8')
      if (decoded.trim().startsWith('{')) {
        const parsed = JSON.parse(decoded)
        options.credentials = {
          client_email: parsed.client_email,
          private_key: parsed.private_key?.replace(/\\n/g, '\n'),
        }
        return new BetaAnalyticsDataClient(options)
      }
    } catch (e) {
      // Not base64
    }

    // C: File path (for local dev)
    const resolvedPath = path.isAbsolute(trimmed)
      ? trimmed
      : path.resolve(process.cwd(), trimmed)
    if (fsSync.existsSync(resolvedPath)) {
      options.keyFilename = resolvedPath
      return new BetaAnalyticsDataClient(options)
    }
  }

  // 3. Fallback to local .json keyfile in workspace root (local dev)
  const defaultKeyPath = path.resolve(process.cwd(), 'kadaur-ec36d157f995.json')
  if (fsSync.existsSync(defaultKeyPath)) {
    options.keyFilename = defaultKeyPath
  }

  return new BetaAnalyticsDataClient(options)
}

let analyticsDataClientInstance: BetaAnalyticsDataClient | null = null

function getClient(): BetaAnalyticsDataClient {
  if (!analyticsDataClientInstance) {
    analyticsDataClientInstance = getAnalyticsDataClient()
  }
  return analyticsDataClientInstance
}

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
    globalSettings.googleAnalytics?.propertyID ||
    process.env.GA_PROPERTY_ID ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!propertyId) {
    console.error('Google Analytics Property ID is missing in Settings or env vars.')
    return null
  }

  if (propertyId.startsWith('G-')) {
    console.warn(
      `Warning: Property ID "${propertyId}" appears to be a Measurement ID (gtag). Google Analytics Data API requires a numeric Property ID.`,
    )
  }

  if (!req.json) {
    console.error('Webhook Error: No data')
    return Response.json({ error: 'Webhook Error' }, { status: 400 })
  }

  const body = await req.json()

  try {
    const client = getClient()
    const [response] = await client.runReport({
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

    const gaData = response.rows?.reduce(
      (acc, row) => {
        const dateStr = row.dimensionValues?.[0]?.value
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

    for (let i = daysToFetch; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)

      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const gaDateString = `${year}${month}${day}`

      data.push({
        date: d.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
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

    const geoFilePath = path.join(process.cwd(), 'src', 'geojson', 'custom.geo.json')
    const geoData = await fs.readFile(geoFilePath, 'utf8')
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

