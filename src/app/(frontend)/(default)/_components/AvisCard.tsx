import React, { RefObject, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import useIntersectionObserver from "../_hooks/useIntersectionObserver";

interface AvisCardProps {
    author: string;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    id?: string;
    animationDelay: number,
    rating: number
}

export default function AvisCard({ author, children, id, ref, animationDelay, rating }: AvisCardProps) {
    const refs = [ref] as RefObject<HTMLElement>[]
        
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

    return (
        <div className='avis-card' id={id} ref={ref} style={{ animationDelay: `${animationDelay}ms`}}>
            <div className="avis-rating">
                {Array.from({length: Math.floor(rating)},(_,index) => <FontAwesomeIcon key={index} icon={faStar} />)}
                { rating - Math.floor(rating) !== 0 ? <FontAwesomeIcon icon={faStarHalfStroke}  /> : <></> }
                { Array.from({length: 5 - Math.ceil(rating)},(_,index) => <FontAwesomeIcon key={index} icon={faStarEmpty} />) }

            </div>
            <p className="avis-author">{author}</p>
            <p className="avis-content">{children}</p>
        </div>
    )
}