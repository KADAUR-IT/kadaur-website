import React from "react";
import Image from "next/image";
import { Media } from "@/payload-types";

interface ClientSliderProps{
    partner: {
        partnerName: string;
        partnerLogo: string | Media;
        id?: string | null;
    }[] | null | undefined,
}

export default function ClientSlider({partner} : ClientSliderProps) {

    const render = partner?.map( (p) => {
        const partnerLogo = p.partnerLogo as Media
        return(
            <Image
                alt={partnerLogo.alt}
                height={64}
                src={partnerLogo.url as string}
                width={245}
                key={p.id}
            />
        )
    } )

    return(
        <div className='client-carousel'>
            <div className="client-slide">
                {render}
            </div>

            <div className="client-slide">
                {render}
            </div>
            
            <div className="client-slide">
                {render}
            </div>   
        </div>
    )
}