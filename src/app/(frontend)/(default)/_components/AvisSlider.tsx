'use client'

import React, { RefObject, useEffect, useRef } from 'react'
import AvisCard from './AvisCard'
import useIntersectionObserver from '../_hooks/useIntersectionObserver'

interface AvisSliderProps {
  avis:
    | {
        avisName: string
        jobTitleAvis?: string | null | undefined
        avisRating: number
        avisText: string
        id?: string | null | undefined
      }[]
    | null
    | undefined
}

export default function AvisSlider({ avis }: AvisSliderProps) {
  const avisRefs: RefObject<HTMLDivElement>[] = []
  const avisBtns: string[] = []

  const render = avis?.map((a, index) => {
    const ref = useRef<HTMLDivElement>(null)
    avisRefs.push(ref as RefObject<HTMLDivElement>)
    avisBtns.push(`avis${index}-btn`)

    return (
      <AvisCard
        key={a.id}
        ref={ref}
        id={`avis${index}`}
        author={`${a.avisName} - ${a.jobTitleAvis}`}
        rating={a.avisRating}
        animationDelay={100 * index}
      >
        "{a.avisText}"
      </AvisCard>
    )
  })

  const visibleIds: string[] = useIntersectionObserver(avisRefs as RefObject<HTMLElement>[], {
    threshold: 0.5, // 50% visible
  })

  //console.log(visibleIds);

  useEffect(() => {
    // Met à jour les boutons en fonction des cartes visibles
    const buttons = avisBtns
    buttons.forEach((btnId, index) => {
      const btn = document.getElementById(btnId)
      if (btn) {
        if (visibleIds.includes(`avis${index}`)) {
          btn.classList.add('active')
        } else {
          btn.classList.remove('active')
        }
      }
    })
  }, [visibleIds])

  return (
    <>
      <div className="avis-cards">{render}</div>
      <div className="avis-slider-btn">
        {avis &&
          avisBtns.length > 0 &&
          avisBtns.map((a, index) => (
            <a
              key={a}
              className={index === 0 ? 'active' : ''}
              id={`${a}`}
              href={`#avis${index}`}
            ></a>
          ))}
      </div>
    </>
  )
}
