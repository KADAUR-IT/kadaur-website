import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface InformationItemProps
{
    icon: IconProp,
    label: string,
    value: string
}

export default function InformationItem({icon, label, value}: InformationItemProps)
{
    return(
        <div className="information-item">
            <span className="information-item-icon"><FontAwesomeIcon icon={icon} /></span>
            <div className="information-item-text">
                <strong>{label}</strong>
                <p>{value}</p>
            </div>
        </div>
    )
}