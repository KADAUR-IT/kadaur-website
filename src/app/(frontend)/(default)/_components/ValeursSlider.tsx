import { faCrosshairs, faEye, faHandHoldingHeart, faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { RefObject } from "react";

interface ValeursSliderProps
{
    ref: RefObject<any>
}

export default function ValeursSlider({ref}: ValeursSliderProps)
{
    return(
        <div ref={ref} className='valeurs-slide'>
            <div className='texts-slide'>
            <p>RESPECT</p>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                <p>TRANSPARENCE</p>
                <FontAwesomeIcon icon={faEye} />
                <p>BIENVEILLANCE</p>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                <p>RIGUEUR</p>
                <FontAwesomeIcon icon={faCrosshairs} />
                </div>
                <div className='texts-slide'>
                <p>RESPECT</p>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                <p>TRANSPARENCE</p>
                <FontAwesomeIcon icon={faEye} />
                <p>BIENVEILLANCE</p>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                <p>RIGUEUR</p>
                <FontAwesomeIcon icon={faCrosshairs} />
                </div>
                <div className='texts-slide'>
                <p>RESPECT</p>
                <FontAwesomeIcon icon={faHandshakeAngle} />
                <p>TRANSPARENCE</p>
                <FontAwesomeIcon icon={faEye} />
                <p>BIENVEILLANCE</p>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                <p>RIGUEUR</p>
                <FontAwesomeIcon icon={faCrosshairs} />
            </div>
        </div>
    )
}