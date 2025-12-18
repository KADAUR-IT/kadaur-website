'use client'

import React, { ReactNode } from "react";
import "./styles.css"

interface ContactSubmitProps
{
    children: ReactNode
}

export default function ContactSubmit({children}: ContactSubmitProps)
{

    return(
        <button type="submit" className="gold">{children}</button>
    )
}