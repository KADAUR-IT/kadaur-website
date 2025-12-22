import React from "react";

export default function SectionTitle({ children, className="" }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={`section-title ${className}`}>{children}</h2>
    )
}