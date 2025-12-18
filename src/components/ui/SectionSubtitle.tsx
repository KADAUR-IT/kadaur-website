import React from "react";

export default function SectionSubtitle({ children }: { children: React.ReactNode }) {
    return (
        <p className="section-subtitle">{children}</p>
    )
}