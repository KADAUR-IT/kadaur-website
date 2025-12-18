'use client'

import React from "react";
import "./sidebar.css"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder, faGauge, faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/dist/client/components/navigation";
import SidebarUserInfo from "./SidebarUserInfo";
import SidebarLinkCategory from "./SiidebarLinkCategory";
import { adminAuthClient } from "@/utils/auth/auth";
import Logo from "@/components/constants/Logo";

export default function Sidebar()
{
    const router = useRouter()
    const path = usePathname()

    const links = [
        {category: "Entreprise", links: [
            {src: "/dashboard", icon: faGauge, label: "Tableau de bord"},
            {src: "/dashboard/prospects", icon: faUsers, label: "Prospects"},
            {src: "/dashboard/rapports", icon: faFolder, label: "Rapports"},
        ]},
        {category: "Prospect", links: [
            {src: "/dashboard", icon: faGauge, label: "Tableau de bord"},
            {src: "/dashboard/cv", icon: faFile, label: "CV"},
        ]},
    ]

    const categoryRender = links.map( (category, index) => {
        return(
            <SidebarLinkCategory key={index} label={category.category} links={category.links} />
        )
    })
    
    

    const handleLogout = async (e: any) => {
        e.preventDefault()

        /*const res = await fetch("/api/kadaur/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response)
            if(response.ok)
            {
                router.push("/");
            }
        })*/

        await adminAuthClient.signout({ returnTo: '/' })
    }

    const handleToggleSidebar = () => {
        const sidebarElement = document.querySelector(".sidebar-container");

        if(sidebarElement){
            sidebarElement.classList.toggle("reduced");
        }
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-menu">
                <div className="sidebar-header">
                    <a href="/">
                        <Logo 
                            version="normal"
                        />
                    </a>
                    <button className="sidebar-handler-wrapper" onClick={handleToggleSidebar}>
                        <div className="sidebar-handler-content">

                        </div>
                    </button>
                </div>
                

                <div className="sidebar-links">
                    {categoryRender}
                </div>
            </div>
            <div className="sidebar-footer">
                <SidebarUserInfo />
                <button onClick={handleLogout} className="sidebar-logout-button"><FontAwesomeIcon icon={faRightFromBracket} /> <p>Déconnexion</p></button>
            </div>
        </div>
    )
}