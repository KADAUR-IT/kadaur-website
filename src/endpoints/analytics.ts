import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { PayloadHandler } from 'payload'

const analyticsDataClient = new BetaAnalyticsDataClient()

export const getAnalyticsData: PayloadHandler = async (req) => {
  if (!req.user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const propertyId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    })

    const data = response.rows?.map((row) => ({
      date: row.dimensionValues?.[0].value,
      users: row.metricValues?.[0].value,
      views: row.metricValues?.[1].value,
    }))

    return Response.json({ message: 'Analytics endpoint is set up.' })
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}
