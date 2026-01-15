"use client"

import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { RefObject, useEffect, useRef } from "react";
import useIntersectionObserver from "../../_hooks/useIntersectionObserver";
import Link from "@/components/ui/Link";

export default function MethodeUseCases()
{
    const startUpRef = useRef<HTMLDivElement>(null);
    const pmeRef = useRef<HTMLDivElement>(null);
    const refs = [startUpRef, pmeRef] as RefObject<HTMLElement>[]
    
    const visibleIds = useIntersectionObserver(refs, {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        for(const id of visibleIds) {
            const el = document.getElementById(id)

            if(el)
                el.classList.add('fade-in-up');
        }

    }, [visibleIds]);

    return(
        <div className='methode-use-cases'>
            <div className="flex flex-col justify-center items-center gap-[8px] w-1/2">
                <SectionTitle className="text-[32px]!">Une méthode adaptée à tous</SectionTitle>
                <Link className="h-fit w-fit hidden! md:flex!" href="/about/expertise">Voir des exemples <FontAwesomeIcon icon={faArrowUp} className="rotate-45" /></Link>
            </div>
            <div className='methode-use-case' ref={startUpRef} id="start-up-img" style={{ animationDelay: `0ms`}}>
                <Image
                    src={"/api/media/file/startup_icon.png"}
                    width={1000}
                    height={1000}
                    alt="Fusée qui décolle"
                />
                <h3>Scale Up</h3>
            </div>
            <div className='methode-use-case' ref={pmeRef} id="pme-img" style={{ animationDelay: `100ms`}}>
                <Image
                    src={"/api/media/file/pme_icon.png"}
                    width={1000}
                    height={1000}
                    alt="Batiment en brique"
                />
                <h3>PME</h3>
            </div>
            <Link className="h-fit w-fit flex! md:hidden!" href="/about/expertise">Voir des exemples <FontAwesomeIcon icon={faArrowUp} className="rotate-45" /></Link>
        </div>
    )
}