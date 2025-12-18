import React from "react";
import "./styles.css"

interface SelectProps
{
    id: string;
    label: string;
    children: React.ReactNode;
    rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function Select({id, label, children, ...rest} : SelectProps)
{
    return (
        <div className="input-group">
            <label>{label}</label>
            <select id={id} name={id} {...rest}>
                {children}
            </select>
        </div>
    )
}