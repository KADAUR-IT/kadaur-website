import React from "react";
import "./styles.css"

interface TextAreaProps
{
    id: string;
    label: string;
    rows?: number;
    placeholder? : string;
}

export default function TextArea({id, label, rows = 5, placeholder = ""} : TextAreaProps)
{
    return (
        <div className="input-group">
            <label>{label}</label>
            <textarea id={id} name={id} rows={rows} placeholder={placeholder}></textarea>
        </div>
    )
}