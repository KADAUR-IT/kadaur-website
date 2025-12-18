import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ScrollButtonProps
{
    onClick: () => void
}

export default function ScrollButton({ onClick }: ScrollButtonProps){

    return(
        <div className="scroll-button" onClick={onClick}>
            <FontAwesomeIcon className="scroll-icon-first scroll-icon" icon={faChevronDown} style={{
            height:"25px"
            }} />
            <FontAwesomeIcon className="scroll-icon-second scroll-icon" icon={faChevronDown} style={{
            height:"25px"
            }} />
            <FontAwesomeIcon className="scroll-icon-third scroll-icon" icon={faChevronDown} style={{
            height:"25px"
            }} />
            
        </div>
    )
}