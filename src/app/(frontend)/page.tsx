import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Button from '@/components/ui/Button'
import { faBuilding, faCarSide, faChevronDown, faCrosshairs, faExpand, faEye, faHandHoldingHeart, faHandshake, faHandshakeAngle, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionSubtitle from '@/components/ui/SectionSubtitle'
import MethodeStep from './_components/MethodeStep'
import OfferSlider from './_components/OfferSlider'
import ClientSlide from './_components/ClientSlide'
import AvisSlider from './_components/AvisSlider'
import ItemSlider from './_components/ItemSlider'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })


  return (
    <>
      <div className='hero-section'>
        <Image
          alt="Kadaur Hero"
          height={1080}
          src="/api/media/file/hero-image.jpg"
          width={1920}
        />
        <h1>Débloquez le potentiel de vos projets IT avec l'accompagnement expert KADAUR.</h1>
        <Button>Demandez votre diagnostic</Button>
        <p>Découvrez la méthode KADAUR</p>
        <FontAwesomeIcon icon={faChevronDown} style={{
          fontSize:"bold"
        }} />
      </div>
      
      <div className='valeurs-slide'>
        <div className='texts-slide'>
          <p>RESPECT</p>
          <FontAwesomeIcon icon={faHandshakeAngle} />
          <p>TRANSPARENCE</p>
          <FontAwesomeIcon icon={faEye} />
          <p>BIENVEILLANCE</p>
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <p>RIGUEUR</p>
          <FontAwesomeIcon icon={faCrosshairs} />
        </div>
        <div className='texts-slide'>
          <p>RESPECT</p>
          <FontAwesomeIcon icon={faHandshakeAngle} />
          <p>TRANSPARENCE</p>
          <FontAwesomeIcon icon={faEye} />
          <p>BIENVEILLANCE</p>
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <p>RIGUEUR</p>
          <FontAwesomeIcon icon={faCrosshairs} />
        </div>
        <div className='texts-slide'>
          <p>RESPECT</p>
          <FontAwesomeIcon icon={faHandshakeAngle} />
          <p>TRANSPARENCE</p>
          <FontAwesomeIcon icon={faEye} />
          <p>BIENVEILLANCE</p>
          <FontAwesomeIcon icon={faHandHoldingHeart} />
          <p>RIGUEUR</p>
          <FontAwesomeIcon icon={faCrosshairs} />
        </div>
      </div>

      <div className='methode-section section'>
        <SectionTitle>Méthode KADAUR</SectionTitle>
        <SectionSubtitle>La méthode KADAUR est conçue pour s’adapter aux réalités complexes de la gestion de projets IT</SectionSubtitle>
        <div className='methode-steps'>
          <MethodeStep title="Conseil" description="Offrir une flexibilité dans l'exécution des projets, en adaptant rapidement nos stratégies aux exigences changeantes du marché." icon={faHandshake}/>
          <MethodeStep title="Structure" description="Optimiser la réactivité grâce à une gestion itérative des phases clés, tout en conservant la rigueur des méthodes traditionnelles." icon={faExpand}/>
          <MethodeStep title="Pilotage" description="Optimiser la réactivité grâce à une gestion itérative des phases clés, tout en conservant la rigueur des méthodes traditionnelles." icon={faCarSide}/>
        </div>
        <p>Cette combinaison unique permet de maximiser la performance de vos projets tout en maintenant le contrôle sur les délais, les coûts et la qualité.</p>
        <Button>En savoir plus</Button>

        <SectionTitle>Une méthode adaptée à vos tous</SectionTitle>
        <div className='methode-use-cases'>
          <div className='methode-use-case'>
            <FontAwesomeIcon icon={faLightbulb}/>
            <h3>Startups</h3>
            <Button>étude de cas</Button>
          </div>
          <div className='methode-use-case'>
            <FontAwesomeIcon icon={faBuilding}/>
            <h3>PME</h3>
            <Button>étude de cas</Button>
          </div>

        </div>
      </div>

      <div className='offer-section section'>
        <SectionTitle>Nos offres</SectionTitle>
        <SectionSubtitle>Découvrez nos approches personnalisées pour optimiser chaque étape de vos projets IT</SectionSubtitle>
        <OfferSlider />
      </div>

      <div className='client-section'>
        <SectionTitle>Nos Clients</SectionTitle>
        <SectionSubtitle>Ils nous ont fait confiance, pourquoi pas vous ?</SectionSubtitle>
        <ClientSlide />
        <AvisSlider />
      </div>
    </>
  )
}
