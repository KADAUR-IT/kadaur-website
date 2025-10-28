'use client'

import React from "react";
import "./sidebar.css"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder, faGauge, faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/dist/client/components/navigation";
import SidebarUserInfo from "./SidebarUserInfo";

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
    

    const handleLogout = async (e) => {
        e.preventDefault()

        const res = await fetch("/api/kadaur/logout", {
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
        })
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-menu">
                <a href="/">
                    <Image
                        alt="Kadaur Logo"
                        height={208}
                        src="/api/media/file/logo-kadaur.png"
                        width={800}
                        className="sidebar-logo"
                    />
                </a>

                <div className="sidebar-links">
                    <p>Entreprise</p>
                    <a href="/dashboard" className="sidebar-link active"><FontAwesomeIcon icon={faGauge} /> Tableau de bord</a>
                    <a href="/dashboard/prospects" className="sidebar-link"><FontAwesomeIcon icon={faUsers} />Prospects</a>
                    <a href="/dashboard/rapports" className="sidebar-link"><FontAwesomeIcon icon={faFolder} />Rapports</a>
                    <br></br>
                    <p>Prospect</p>
                    <a href="/dashboard" className="sidebar-link active"><FontAwesomeIcon icon={faGauge} /> Tableau de bord</a>
                    <a href="/dashboard/cv" className="sidebar-link"><FontAwesomeIcon icon={faFile} />CV</a>
                </div>
            </div>
            <div className="sidebar-footer">
                <SidebarUserInfo />
                <button onClick={handleLogout} className="sidebar-logout-button"><FontAwesomeIcon icon={faRightFromBracket} /> Déconnexion</button>
            </div>
        </div>
    )
}