'use client'

import React, { ReactNode } from "react";
import "./styles.css";

export type ButtonStyle = "blue" | "white" | "gold"

interface SubmitFormProps
{
    children: ReactNode;
    buttonStyle?: ButtonStyle;
    onClick?: () => void
}

export default function SubmitForm({buttonStyle = "blue", children, onClick} : SubmitFormProps)
{
    function handleClick()
    {
        if(onClick)
            onClick();
    }

    return (
        <button role={onClick ? "button" : "submit"} onClick={handleClick} className={buttonStyle}>{children}</button>
    )
}