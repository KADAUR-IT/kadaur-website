import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";

interface UniqueSellingPointProps
{
    children: ReactNode;
}

export default function UniqueSellingPoint({children} : UniqueSellingPointProps)
{
    return(
        <div className="usp">
            <FontAwesomeIcon icon={faArrowRight} />
            <p>{children}</p>
        </div>
    )
}