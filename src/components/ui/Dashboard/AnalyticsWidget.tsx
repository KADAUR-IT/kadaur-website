'use client'

import React, { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const style = {
  backgroundColor: 'var(--theme-elevation-50)',
  padding: '2rem',
  marginBottom: '2rem',
  borderRadius: '4px',
  boxShadow: 'var(--theme-shadow-card)',
  flexGrow: 1,
}

export const AnalyticsWidget: React.FC<{ path: string }> = ({ path }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const responseLabel = ['date', 'views', 'users']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('/api/globals/settings/analytics/views-and-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
            keepEmptyRows: true,
            orderBys: [
              {
                dimension: {
                  dimensionName: 'date',
                },
                desc: false,
              },
            ],
          }),
        })
        const res = await req.json()
        console.log(res)
        setData(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={style}>
      <h3>Trafic (7 derniers jours)</h3>
      <div
        style={{
          height: '300px',
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray={'3 3'} stroke="#ccc" />
            <XAxis dataKey={'date'} stroke="var(--theme-elevation-800)" />
            <YAxis width="auto" stroke="var(--theme-elevation-800)" />
            <Tooltip />
            <Legend />
            <Bar type={'monotone'} dataKey={'views'} fill="#8884d8" name="Vues" />
            <Bar type={'monotone'} dataKey={'users'} fill="#82ca9d" name="Utilisateurs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
