'use client'

import React, { ReactNode } from "react";
import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface ContactSubmitProps
{
    isLoading?: boolean
    children: ReactNode
}

export default function ContactSubmit({isLoading = false,children}: ContactSubmitProps)
{

    return(
        <button type="submit" className="gold" disabled={isLoading}>{isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin={true} /> : children}</button>
    )
}