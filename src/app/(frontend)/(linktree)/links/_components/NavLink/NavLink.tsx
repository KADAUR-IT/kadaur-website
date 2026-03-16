import { Media } from '@/payload-types'
import { faEllipsisVertical, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  large?: boolean
  children: ReactNode
  thumbnail?: Media
}

export default function NavLink({ href, large = false, children, thumbnail }: NavLinkProps) {
  const borderRadius = large ? 'rounded-[30px]' : 'rounded-[50px]'

  return (
    <Link
      className={`w-full ${large ? 'aspect-video relative flex justify-center' : ''} text-(--color-white) border-(--color-white) border-[1px] ${borderRadius} overflow-hidden font-bold transition-all duration-300 hover:bg-[#f5f5f521] group`}
      href={href}
    >
      {large && thumbnail && (
        <Image
          src={thumbnail?.url as string}
          width={thumbnail?.width as number}
          height={thumbnail?.height as number}
          alt={thumbnail?.alt as string}
          className={`w-full h-full object-cover ${large ? '' : 'hidden!'}`}
        />
      )}

      <div
        className={`flex items-center p-2 ${large && thumbnail && 'absolute bottom-0 left-0 w-full bg-(--color-blue) group-hover:bg-[#38516B]'}`}
      >
        <FontAwesomeIcon icon={faLink} className={`h-[32px] ${large ? 'hidden!' : ''}`} />
        <p className="grow-1 text-center">{children}</p>
        <FontAwesomeIcon icon={faEllipsisVertical} className="h-[24px] mr-3" />
      </div>
    </Link>
  )
}
