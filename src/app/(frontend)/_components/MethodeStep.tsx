import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MethodeStepProps {
    title: string;
    description: string;
    icon : IconDefinition;
}

export default function MethodeStep({ title, description, icon }: MethodeStepProps) {
    return (
        <div className='methode-step'>
            <FontAwesomeIcon icon={icon}/>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
    )
}