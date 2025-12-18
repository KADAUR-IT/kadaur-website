import React from "react";

export type ButtonColor = "blue" | "white"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    buttonColor?: ButtonColor;
    href: string
}

export default function Link({ children, className = "", buttonColor = "blue", href, ...rest }: ButtonProps) {
    return (
        <a href={href} className={`kadaur-button ${buttonColor} ${className}`} {...rest}>{children}</a>
    )
}