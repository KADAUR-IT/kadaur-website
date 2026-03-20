import React from 'react'
import MethodeStep from '../MethodeStep'
import Link from '@/components/ui/Link'

export default function MethodeSteps() {
  return (
    <div className="methode-steps">
      <MethodeStep animationDelay={100} title="Éclairer" imageSrc="/api/media/file/lighthouse.png">
        <p className="grow-1">Rendre le produit infrastructure visible et compréhensible</p>
        <Link
          href="/methode-kadaur#eclairer"
          linkColor="gold"
          className="m-0! mt-4! text-sm! w-full"
        >
          En savoir +
        </Link>
      </MethodeStep>
      <MethodeStep
        animationDelay={200}
        title="Structurer"
        imageSrc="/api/media/file/structurer2.png"
      >
        <p className="grow-1">
          Donner une gouvernance et une trajectoire au produit Infrastructure
        </p>
        <Link
          href="/methode-kadaur#structurer"
          linkColor="gold"
          className="m-0! mt-4! text-sm! w-full"
        >
          En savoir +
        </Link>
      </MethodeStep>
      <MethodeStep animationDelay={300} title="Ancrer" imageSrc="/api/media/file/ancrer.png">
        <p className="grow-1">Faire vivre le produit infrastructure dans la durée</p>
        <Link href="/methode-kadaur#ancrer" linkColor="gold" className="m-0! mt-4! text-sm! w-full">
          En savoir +
        </Link>
      </MethodeStep>
    </div>
  )
}
