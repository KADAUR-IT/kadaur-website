'use client'

import Logo from '@/components/constants/Logo'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Form/Input/Input'
import Image from 'next/image'
import React from 'react'
import SummaryItem from './_components/SummaryItem'
import Link from '@/components/ui/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

interface LivreBlancPageClientProps {
  livreBlanc: any
}

export default function LivreBlancPageClient({ livreBlanc }: LivreBlancPageClientProps) {
  const fileURL = livreBlanc?.file?.url || '/assets/files/livre%20blanc%20KADAUR%202026.pdf'
  const summaryItems = livreBlanc?.summaryItems.map((item: any) => item.title) || []

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const formErrorHeader = document.getElementById('form-error-header')
    if (formErrorHeader) {
      formErrorHeader.classList.add('hidden')
    }
    const inputs = document.querySelectorAll<HTMLInputElement>('.form-input')
    inputs.forEach((input: HTMLInputElement) => {
      input.classList.remove('border-red-500!', 'border!')
    })
    const inputsInvalid = Array.from<HTMLInputElement>(inputs).filter(
      (input: HTMLInputElement) => input.value === '',
    )

    if (inputsInvalid.length > 0) {
      e.preventDefault()

      if (formErrorHeader) {
        formErrorHeader.classList.remove('hidden')
      }
      inputsInvalid.forEach((input: HTMLInputElement) => {
        input.classList.add('border-red-500!', 'border!')
      })
      return
    }

    const dataToSend = {
      name: inputs[0].value + ' ' + inputs[1].value,
      entreprise: inputs[2].value,
      mail: inputs[3].value,
    }

    try {
      const req = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      const res = await req.json()
      const status = req.status

      const toastNotify = status === 200 ? toast.success : toast.error
      toastNotify(res.message, {
        position: 'bottom-right',
      })
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue', {
        position: 'bottom-right',
      })
      e.preventDefault()
      return
    }
  }

  const handleScrollToForm = () => {
    const formMobile = document.getElementById('form-mobile')
    if (formMobile) {
      formMobile.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden">
      <div className="relative overflow-hidden w-full h-dvh bg-(--color-white) md:px-64 flex">
        <div className="md:w-2/3 md:py-8 p-8 flex flex-col">
          <Logo version="normal" className="w-full md:w-[400px]" />
          <h1 className="text-[20px]! leading-[24px]! text-center md:text-start md:text-[36px]! md:leading-[36px]!">
            Piloter, arbitrer, orchestrer : l'infrastructure IT est devenue un produit stratégique
          </h1>
          <Image
            src={'/assets/images/kadaur_white_paper_illu.png'}
            width={2637}
            height={2637}
            alt="Livre Blanc KADAUR"
            className="relative md:absolute w-full md:w-[1200px] bottom-0 left-0 md:translate-y-[40%] md:translate-x-[10%]"
          />
          <div className="md:hidden blur-sm">
            <svg height="100%" width="auto" xmlns="http://www.w3.org/2000/svg">
              <ellipse rx="35%" ry="25" cx="50%" cy="25" fill="#00000025" />
            </svg>
          </div>

          <Button className="md:hidden!" onClick={handleScrollToForm}>
            Télécharger le livre blanc
          </Button>
        </div>

        <div className="flex items-end py-8">
          <div className="relative hidden md:block z-10 w-full h-fit md:w-[400px] bg-(--color-gold) px-8 md:px-4 py-8 md:py-16 md:rounded-[20px] overflow-hidden shadow-[0_8px_20px_5px_rgba(0,0,0,0.25)]">
            <div className="relative flex flex-col gap-8 z-12">
              <h2 className="text-center text-[28px]! leading-[28px]! md:text-[28px]! md:leading-[30px]! font-semibold! text-white">
                Prêt à moderniser votre infrastructure ?
              </h2>
              <div className="flex flex-col gap-4">
                <div
                  id="form-error-header"
                  className="hidden bg-red-100 text-red-500 rounded p-2 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <p>Veuillez remplir tous les champs</p>
                </div>
                <Input className="form-input" id="prenom" label="Prénom" placeholder="Jean" />
                <Input className="form-input" id="nom" label="Nom" placeholder="Dupond" />
                <Input
                  className="form-input"
                  id="entreprise"
                  label="Entreprise"
                  placeholder="Inc."
                />
                <Input className="form-input" id="mail" label="E-mail" placeholder="jean@mail.fr" />
              </div>
              <Link href={fileURL} className="w-full" onClick={handleDownload} download>
                Télécharger
              </Link>
            </div>

            <div className="absolute bottom-0 right-0 z-11">
              <svg height="800" width="400" xmlns="http://www.w3.org/2000/svg">
                <circle r="400" cx="450" cy="700" fill="#CFB187" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        id="form-mobile"
        className="relative md:hidden block z-10 w-full h-fit md:w-[400px] bg-(--color-gold) px-8 md:px-4 py-8 md:py-16 md:rounded-[20px] overflow-hidden shadow-[0_8px_20px_5px_rgba(0,0,0,0.25)]"
      >
        <div className="relative flex flex-col gap-8 z-12">
          <h2 className="text-center text-[28px]! leading-[28px]! md:text-[36px]! md:leading-[36px]! text-white">
            Prêt à moderniser votre infrastructure ?
          </h2>
          <div className="flex flex-col gap-4">
            <div
              id="form-error-header"
              className="hidden bg-red-100 text-red-500 rounded p-2 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faCircleExclamation} />
              <p>Veuillez remplir tous les champs</p>
            </div>
            <Input className="form-input" id="prenom" label="Prénom" placeholder="Jean" />
            <Input className="form-input" id="nom" label="Nom" placeholder="Dupond" />
            <Input className="form-input" id="entreprise" label="Entreprise" placeholder="Inc." />
            <Input className="form-input" id="mail" label="E-mail" placeholder="jean@mail.fr" />
          </div>
          <Link href={fileURL} className="w-full" onClick={handleDownload} download>
            Télécharger
          </Link>
        </div>

        <div className="absolute bottom-0 right-0 z-11">
          <svg height="800" width="400" xmlns="http://www.w3.org/2000/svg">
            <circle r="400" cx="450" cy="700" fill="#CFB187" />
          </svg>
        </div>
      </div>

      <div className="relative overflow-hidden w-full h-full bg-(--color-blue) md:px-[300px] p-8">
        <div className="relative z-5 w-full md:w-6/10">
          <h1 className="w-full md:w-2/3 text-[28px]! leading-[28px]! md:text-[36px]! md:leading-[36px]! text-white">
            Les 5 points du pilotage IT façon KADAUR
          </h1>
          <div className="relative text-[20px] z-5 md:text-[24px] flex flex-col gap-4 md:gap-8">
            {summaryItems.map((item: any, index: number) => (
              <SummaryItem key={index} index={index + 1} title={item} />
            ))}
          </div>
        </div>
        <Image
          src={'/assets/images/kadaur_mascotte.png'}
          width={259}
          height={670}
          alt="Mascotte KADAUR"
          className="absolute z-0 md:z-11 right-[50px] bottom-[-250px] md:right-[400px] md:bottom-[-100px] h-[600px]! w-auto"
        />

        <div className="absolute bottom-0 left-0 z-4">
          <svg height="1500" width="1500" xmlns="http://www.w3.org/2000/svg">
            <circle r="750" cx="0" cy="1700" fill="#254E7B" />
          </svg>
        </div>
      </div>
    </div>
  )
}
