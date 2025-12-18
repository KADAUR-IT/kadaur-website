import React from "react";
import SidebarLink from "./SidebarLink";
import { usePathname } from "next/navigation";

interface  SidebarLinkCategoryProps {
    label : string;
    links: any[]
}

export default function SidebarLinkCategory({ label, links } : SidebarLinkCategoryProps)
{

    const path = usePathname()

    const linksRender = links.map( (link, index) => {
        return (
            <SidebarLink key={index} src={link.src} isActive={path === link.src} icon={link.icon} label={link.label} />
        )

        
    })

    return(
        <>
            <p className="sidebar-category">{label}</p>
            {linksRender}
        </>
    )
}