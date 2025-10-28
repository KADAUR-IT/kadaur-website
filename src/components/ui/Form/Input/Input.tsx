import React from "react";
import "./styles.css"

interface InputProps
{
    id: string;
    label: string;
    type?: string;
    placeholder? : string;
    rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Input({id, label, type = "text", placeholder = "", ...rest} : InputProps)
{
    return (
        <div className="input-group">
            <label>{label}</label>
            <input id={id} name={id} type={type} placeholder={placeholder} {...rest}></input>
        </div>
    )
}