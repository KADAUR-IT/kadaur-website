'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ReactNode } from "react";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

library.add(fas)

export type Link =
{
    label: string;
    link?: string | null | undefined;
    isButton?: boolean | null | undefined;
    subLinks?: {
        label: string;
        link?: string | null | undefined;
        isButton?: boolean | null | undefined;
        id?: string | null | undefined;
    }[] | null | undefined;
    id?: string | null | undefined;
}

interface NavbarLinkProps 
{
    link : Link
}

export default function NavbarLink({link} : NavbarLinkProps) {
    const pathname = usePathname();
    const pathList = pathname.split('/').filter(Boolean);

    if(!link)
    {
        return
    }

    const [isOpen, setOpen] = useState(false);
    const [isActive, setActive] = useState(link.link === pathList[0]);

    function handleClick() 
    {
        setOpen(!isOpen);
    }

    function closeSubnavbar()
    {
        setOpen(false)
    }

    let classnameLink = link.isButton ? "navbar-button" : "navbar-link"
    if(isOpen || isActive) classnameLink += " active"

    let classnameSubnavbar = "subnavbar-links"
    if(!isOpen) classnameSubnavbar += " hide"

    let icon = isOpen ? "chevron-up" : "chevron-down"

    let mappedSubLinks : ReactNode[] = []
    if(link.subLinks)
    {
        mappedSubLinks = link.subLinks.map( (sublink) => {
            const isActive = sublink.link === pathList[1];

            return (
                <a className={`navbar-link ${isActive ? "active" : ""}`} href={"/" + link.link + "/" + sublink.link} key={sublink.label}>{sublink.label}</a>
            )
      } )
    }

    return (
        link.subLinks && link.subLinks.length > 0 ?
        <button className={classnameLink} onClick={handleClick}>
            {link.label}
            <FontAwesomeIcon icon={["fas", icon as IconName]} className="desktop-only" />
            <div className={classnameSubnavbar}>
                {mappedSubLinks}
            </div>
        </button>
        :
        <a href={"/" + link.link} className={classnameLink}>{link.label}</a>
    )
}