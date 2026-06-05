import Link from '@/components/ui/Link'
import { Media, Offer } from '@/payload-types'
import { imageLoader } from '@/utils/images/imagesLoader'
import { faArrowRight, IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

interface ServiceCardProps {
  service: Offer
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const banner: Media = service.banner as Media

  return (
    <div className="w-full flex flex-col items-start gap-[10px] rounded-[10px] bg-(--color-blue-hover) border border-[#6278B0] p-3">
      <div className="flex items-center gap-[5px] justify-start w-full text-(--color-gold)">
        <FontAwesomeIcon icon={['fas' as IconPrefix, service.icon as IconName]} />
        {service.description}
      </div>
      {banner && (
        <Image
          src={banner.url as string}
          alt={banner.alt}
          width={banner.width as number}
          height={banner.height as number}
          loader={imageLoader}
          className="max-h-[200px] w-full rounded-[5px]"
        />
      )}

      <div className="text-white">
        <p className="font-bold uppercase">{service.titleLandingPage}</p>
        <p className="text-sm">{service.moreInfoShort}</p>
      </div>
      <div className="flex items-end justify-end w-full">
        <Link
          href={`/offers?id=${index}`}
          linkColor="white"
          className="text-sm! group hover:scale-102 m-0!"
        >
          En savoir plus
          <FontAwesomeIcon
            icon={faArrowRight}
            className="group-hover:translate-x-0.5 transition-transform transition-300"
          />
        </Link>
      </div>
    </div>
  )
}
