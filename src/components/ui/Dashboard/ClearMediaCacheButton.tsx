// components/ClearMediaCacheButton.tsx
'use client'

import React, { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'

export default function ClearMediaCacheButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClearCache = async () => {
    setIsLoading(true)

    try {
      // L'URL correspond au slug de ta collection (/api/media) + le path de ton endpoint
      const response = await fetch('/api/media/clear-custom-cache', {
        method: 'POST',
      })

      if (response.ok) {
        toast.success('Le cache des médias a été vidé avec succès.')
      } else {
        toast.error('Une erreur est survenue lors du vidage du cache.')
      }
    } catch (error) {
      toast.error('Erreur réseau impossible de joindre le serveur.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        onClick={handleClearCache}
        disabled={isLoading}
        buttonStyle="secondary" // Utilise 'primary' ou 'secondary' selon tes préférences
      >
        {isLoading ? 'Vidage en cours...' : 'Vider le cache Média'}
      </Button>
    </div>
  )
}
