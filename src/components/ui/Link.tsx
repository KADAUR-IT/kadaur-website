import React from "react";

export type ButtonColor = "blue" | "white" | "gold" | "transparent"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    linkColor?: ButtonColor;
    href: string
}

export default function Link({ children, className = "", linkColor = "blue", href, ...rest }: ButtonProps) {
    return (
        <a href={href} className={`kadaur-button ${linkColor} ${className}`} {...rest}>{children}</a>
    )
}