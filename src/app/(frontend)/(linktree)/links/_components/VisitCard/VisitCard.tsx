"use client"

import Logo from "@/components/constants/Logo";
import Image from "next/image";
import React from "react";

export default function VisitCard()
{
    const handleTurningCard = () => {
        const recto = document.getElementById("vc-recto")
        const verso = document.getElementById("vc-verso")

        if(recto && verso)
        {
            recto.classList.toggle("rotate-y-180")
            verso.classList.toggle("rotate-y-180")
        }
    }

    return(
        <div className="w-full aspect-video relative">
            <div onClick={handleTurningCard} id="vc-recto" className="absolute top-0 left-0 flex gap-2 items-center aspect-video w-full p-2 bg-(--color-white) backface-hidden transition-all duration-300">
                <div className="flex flex-col items-start text-(--color-blue) font-bold">
                    <h1 className="m-0! text-[36px]! md:text-[40px]! md:leading-[40px]!">Aurore KAMGEU</h1>
                    <h2 className="text-(--color-gold)! text-[36px]! md:text-[40px]! md:leading-[40px]!">CEO</h2>
                    <a href="mailto:akamgueu@kadaur.com" onClick={(e) => e.stopPropagation()}>akamgueu@kadaur.com</a>
                    <a href="tel:+33612381617" onClick={(e) => e.stopPropagation()}>+33 (0) 6 12 38 16 17</a>
                    <p>www.kadaur.com</p>
                    <p>kadaur</p>
                </div>
                <div className="flex flex-col items-start justify-center text-(--color-blue) font-bold grow-1">
                    <Image
                        src={"/api/media/file/qr_kadaur.png"}
                        height={225}
                        width={225}
                        alt="QR Code du site"
                        className="w-[100px] aspect-square mx-auto"
                    />
                </div>
            </div>
            <div onClick={handleTurningCard} id="vc-verso" className="absolute top-0 left-0 flex gap-2 items-center aspect-video w-full p-4 bg-(--color-white) backface-hidden transition-all duration-300 rotate-y-180">
                <Logo version="normal" />
            </div>
        </div>
    )
}