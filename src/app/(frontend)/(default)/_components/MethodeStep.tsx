'use client';

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { RefObject, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import Image from "next/image";

interface MethodeStepProps {
    title: string;
    description: string;
    icon : IconDefinition;
    animationDelay?: number;
    imageSrc?: string;
}

export default function MethodeStep({ title, description, icon, imageSrc, animationDelay = 0 }: MethodeStepProps) {
    const ref = useRef<HTMLDivElement>(null);

    const visibleIds = useIntersectionObserver([ref] as RefObject<HTMLElement>[], {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        for(const id of visibleIds) {
            ref.current?.classList.add('fade-in-up');
            ref.current?.classList.add('card');
        }

    }, [visibleIds]);

    return (
        <div id={title.toLowerCase()} ref={ref} className='methode-step' style={
            {
                animationDelay: `${animationDelay}ms`
            }
        }>
            <Image 
                src={imageSrc || "/api/media/file/test-1.png"}
                width={398}
                height={364}
                alt="test"
            />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
    )
}