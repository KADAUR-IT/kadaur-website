import React from "react";

export type ButtonColor = "blue" | "white"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    buttonColor?: ButtonColor;
    onClick?: () => void;
}

export default function Button({ children, className, buttonColor = "blue", onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={`kadaur-button ${buttonColor} ${className}`}>{children}</button>
    )
}