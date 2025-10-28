'use client'

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

interface NavbarProps
{
    mappedLinks: ReactNode[], 
    isAuth: boolean
}

export default function NavbarClient({mappedLinks, isAuth} : NavbarProps)
{
    const [subOpen, setOpen] = useState(false)

    let classnameSub = "subnavbar-container"
    classnameSub += subOpen ? "" : " hide"

    function handleClickMobile()
    {
        setOpen(!subOpen)
    }

    return (
        <>
            <div className='navbar-container'>
                <div className='kadaur-logo'>
                    <a href="/">
                        <Image
                            alt="Kadaur Logo"
                            height={208}
                            src="/api/media/file/logo-kadaur.png"
                            width={800}
                        />
                    </a>
                </div>
                <div className='navbar-links desktop-only'>
                    {mappedLinks}
                    <a href={isAuth ? "/dashboard" : "/login"} className="navbar-link"><FontAwesomeIcon icon={faUser} /></a>
                </div>
                <div className="mobile-only">
                    <Button className="navbar-button-mobile" onClick={handleClickMobile}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>
            </div>
            <div className={classnameSub}>
                <div className='subnavbar-links'>
                    {mappedLinks}
                </div>
            </div>
        </>
    )
}