import React from "react";
import "./styles.css"

interface CheckboxProps
{
    id: string;
    label: string;
}

export default function Checkbox({id, label} : CheckboxProps)
{
    return (
        <div className="checkbox-group">
            <input id={id} name={id} type="checkbox"></input>
            <label>{label}</label>
        </div>
    )
}