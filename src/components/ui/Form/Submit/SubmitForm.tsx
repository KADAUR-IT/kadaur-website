import React, { ReactNode } from "react";
import "./styles.css";

export type ButtonStyle = "blue" | "white" | "gold"

interface SubmitFormProps
{
    children: ReactNode;
    buttonStyle?: ButtonStyle;
}

export default function SubmitForm({buttonStyle = "blue", children} : SubmitFormProps)
{
    return (
        <button className={buttonStyle} >{children}</button>
    )
}