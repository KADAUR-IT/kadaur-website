'use client'

import React from 'react'

interface WhyCardProps {
  title: string
  description: string
  column: 1 | 2
}

export default function WhyCard({ title, description, column }: WhyCardProps) {
  return (
    <div
      className={`bg-(--color-blue-hover) border border-[#6278B0] p-10 rounded-lg`}
      style={{
        gridColumnEnd: `span ${column}`,
      }}
    >
      <h3 className="text-[24px]! text-(--color-gold)! font-semibold!">{title}</h3>
      <p className="text-[16px]! text-(--color-white)! font-normal!">{description}</p>
    </div>
  )
}
