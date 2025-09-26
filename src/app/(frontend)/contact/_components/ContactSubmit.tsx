'use client'

import React, { ReactNode } from "react";
import { handleMail } from "../_actions/sendMail";
import "./styles.css"

interface ContactSubmitProps
{
    children: ReactNode
}

export default function ContactSubmit({children}: ContactSubmitProps)
{

    return(
        <button role={"button"} onClick={handleMail} className="gold">{children}</button>
    )
}