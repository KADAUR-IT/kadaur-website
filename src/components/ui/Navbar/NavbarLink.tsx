'use client'

import React, { useState } from "react";
import { ReactNode } from "react";

export type Link =
{
    label : string,
    isButton : boolean,
    link?: string,
    subLinks?: Link[]
}

interface NavbarLinkProps 
{
    link : Link
}

export default function NavbarLink({link} : NavbarLinkProps) {
    if(!link)
    {
        return
    }

    const [isOpen, setOpen] = useState(false);

    function handleClick() 
    {
        setOpen(!isOpen);
    }

    function closeSubnavbar()
    {
        setOpen(false)
    }

    let classnameLink = link.isButton ? "navbar-button" : "navbar-link"

    let classnameSubnavbar = "subnavbar-links"
    if(!isOpen) classnameSubnavbar += " hide"

    let mappedSubLinks : ReactNode[] = []
    if(link.subLinks)
    {
        mappedSubLinks = link.subLinks.map( (link) => {
        return (
          <a className="navbar-link" href={link.link} key={link.label}>{link.label}</a>
        )
      } )
    }

    return (
        link.subLinks && link.subLinks.length > 0 ?
        <button className={classnameLink} onClick={handleClick} onBlur={closeSubnavbar}>
            {link.label}
            <div className={classnameSubnavbar}>
                {mappedSubLinks}
            </div>
        </button>
        :
        <a href={link.link} className={classnameLink}>{link.label}</a>
    )
}