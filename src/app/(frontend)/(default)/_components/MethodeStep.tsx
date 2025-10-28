'use client';

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";

interface MethodeStepProps {
    title: string;
    description: string;
    icon : IconDefinition;
    animationDelay?: number;
}

export default function MethodeStep({ title, description, icon, animationDelay = 0 }: MethodeStepProps) {
    const ref = useRef(null);

    const visibleIds = useIntersectionObserver([ref], {
        threshold: 0.5, // 50% visible
    });

    useEffect(() => {
        for(const id of visibleIds) {
            ref.current?.classList.add('fade-in-up');
        }

    }, [visibleIds]);

    return (
        <div id={title.toLowerCase()} ref={ref} className='methode-step' style={
            {
                animationDelay: `${animationDelay}ms`
            }
        }>
            <FontAwesomeIcon icon={icon}/>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
    )
}