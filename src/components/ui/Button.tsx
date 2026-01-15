import React from "react";

export type ButtonColor = "blue" | "white" | "gold"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    buttonColor?: ButtonColor;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, className = "", buttonColor = "blue", onClick, ...rest }: ButtonProps) {
    return (
        <button onClick={onClick} className={`kadaur-button ${buttonColor} ${className}`} {...rest}>{children}</button>
    )
}