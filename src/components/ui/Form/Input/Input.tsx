import React from "react";
import "./styles.css"

interface InputProps
{
    id: string;
    label: string;
    type?: string;
    placeholder? : string;
    defaultValue? : any
    onChange?: (...args: any[]) => void
}

export default function Input({id, label, type = "text", placeholder = "", defaultValue = "", onChange, ...rest} : InputProps)
{
    return (
        <div className="input-group">
            <label>{label}</label>
            <input id={id} name={id} type={type} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} {...rest}></input>
        </div>
    )
}