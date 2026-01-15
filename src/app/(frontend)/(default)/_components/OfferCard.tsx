import { IconDefinition, IconName } from "@fortawesome/free-solid-svg-icons";
import React, { RefObject, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Media, Offer } from "@/payload-types";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import Link from "@/components/ui/Link";
import Image from "next/image";

type OfferCardColor = 'gold' | 'green' | 'blue' | 'red';

interface OfferCardProps {
    color : OfferCardColor;
    ref?: React.Ref<HTMLDivElement>;
    id?: string;
    index?: number;
    offer: Offer
    animationDelay: number
}

export default function OfferCard({color, ref, id, index, offer, animationDelay }: OfferCardProps) {
    const refs = [ref] as RefObject<HTMLElement>[]
    
    const visibleIds = useIntersectionObserver(refs, {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        for(const id of visibleIds) {
            const el = document.getElementById(id)

            if(el)
            {
                el.classList.add('fade-in-up');
                el.classList.add('card');
            }
        }

    }, [visibleIds]);

    const offerImage = offer.image as Media || null

    return (
        <div className={`offer-card`} ref={ref} id={id} style={{ animationDelay: `${animationDelay}ms`}}>
            
            {!offerImage && 
                <div className={`offer-icon ${color}`}>
                <FontAwesomeIcon icon={["fas", offer.icon as IconName]}/>
                </div>
            }
            {offerImage && 
                <Image
                    src={offerImage.url as string}
                    alt={offerImage.alt as string}
                    width={offerImage.width as number}
                    height={offerImage.height as number}
                />
            }
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
            <Link href={`/offers?id=${index}`} linkColor="white">En savoir plus</Link>
        </div>
    );
}
