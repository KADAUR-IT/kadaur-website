'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Map, { Layer, LayerProps, Source } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

const style = {
  backgroundColor: 'var(--theme-elevation-50)',
  padding: '2rem',
  marginBottom: '2rem',
  borderRadius: '4px',
  boxShadow: 'var(--theme-shadow-card)',
  flexGrow: 1,
  maxWidth: '50%',
}

const dataLayer: LayerProps = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': '#3288bd',
    'fill-opacity': 0.8,
  },
}

export const MapsUserAnalyticsWidget: React.FC<{ path: string }> = ({ path }) => {
  const [data, setData] = useState([])
  const [geoData, setGeoData] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [hoverInfo, setHoverInfo] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('/api/globals/settings/analytics/country', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dimensions: [
              {
                name: 'country',
              },
            ],
            metrics: [
              {
                name: 'activeUsers',
              },
            ],
          }),
        })
        const res = await req.json()
        console.log(res)
        setData(res.data)
        setGeoData(res.geoData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const onHover = useCallback((event: any) => {
    const {
      features,
      point: { x, y },
    } = event
    const hoveredFeature = features && features[0]

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, [])

  return (
    <div style={style}>
      <h3>Carte des visiteurs (7 derniers jours)</h3>
      <div
        style={{
          height: '300px',
        }}
      >
        <Map
          initialViewState={{
            longitude: 2.45,
            latitude: 48.73,
            zoom: 1,
          }}
          style={{ width: '100%', height: 300, position: 'relative' }}
          interactiveLayerIds={['data']}
          onMouseMove={onHover}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <Source type="geojson" data={geoData}>
            <Layer {...dataLayer} />
          </Source>
          {hoverInfo && (
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                left: hoverInfo.x,
                top: hoverInfo.y,
                opacity: 1,
                visibility: 'initial',
                pointerEvents: 'none',
              }}
            >
              <div>{hoverInfo.feature.properties.name}</div>
              <div>
                Users:
                {
                  (
                    data.find(
                      (item: any) => item.country === hoverInfo.feature.properties.name_long,
                    ) as any
                  )?.users
                }
              </div>
            </div>
          )}
        </Map>
      </div>
    </div>
  )
}
