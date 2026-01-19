'use client';

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { RefObject, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";
import Image from "next/image";
import { imageLoader } from "@/utils/images/imagesLoader";

interface MethodeStepProps {
    title: string;
    animationDelay?: number;
    imageSrc?: string;
    children?: React.ReactNode;
}

export default function MethodeStep({ title, imageSrc, animationDelay = 0, children }: MethodeStepProps) {
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
            <h3>{title}</h3>
            <Image 
                src={imageSrc || "/api/media/file/test-1.png"}
                width={398}
                height={364}
                loader={imageLoader}
                alt="test"
            />
            {children}
          </div>
    )
}