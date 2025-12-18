import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SidebarLinkProps {
    src: string;
    icon: IconProp;
    label: string;
    isActive: boolean;
}

export default function SidebarLink({ src, icon, label, isActive }: SidebarLinkProps)
{
    return(
        <a href={src} className={`sidebar-link ${isActive ? "active" : ""}`}><FontAwesomeIcon icon={icon} /><p>{label}</p></a>
    )
}