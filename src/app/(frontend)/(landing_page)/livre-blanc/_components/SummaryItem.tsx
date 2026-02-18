import React from 'react'

interface SummaryItemProps {
  index: number
  title: string
}

export default function SummaryItem({ index, title }: SummaryItemProps) {
  return (
    <div className="w-full flex gap-8 items-center shadow-[0_5px_15px_10px_rgba(0,0,0,0.25)] rounded-[5px] bg-(--color-gold) px-4 py-2 text-white hover:border-white border-2 border-(--color-gold)">
      <span className="rounded-full h-10 w-10 flex items-center justify-center bg-white text-(--color-blue) font-bold">
        {index}.
      </span>
      <p>{title}</p>
    </div>
  )
}
