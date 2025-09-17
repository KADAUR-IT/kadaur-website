import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface AvisCardProps {
    author: string;
    children: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    id?: string;
}

export default function AvisCard({ author, children, id, ref }: AvisCardProps) {
    return (
        <div className='avis-card' id={id} ref={ref}>
            <div className="avis-rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            <p className="avis-author">{author}</p>
            <p className="avis-content">{children}</p>
        </div>
    )
}