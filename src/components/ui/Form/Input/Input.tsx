import React from "react";
import "./styles.css"

interface InputProps
{
    id: string;
    label: string;
    type?: string;
    placeholder? : string;
}

export default function Input({id, label, type = "text", placeholder = ""} : InputProps)
{
    return (
        <div className="input-group">
            <label>{label}</label>
            <input id={id} type={type} placeholder={placeholder}></input>
        </div>
    )
}