'use client'

import React, { useEffect, useState } from "react";

export default function SidebarUserInfo(){
    const [user, setUser] = useState({
        firstName: "Prénom",
        lastName: "Nom",

    })

    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch("/api/kadaur/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const res = await response.json();
                setUser(res.user)
                console.log("User data:", res);
            }catch(err)
            {
                console.error("Error fetching user data:", err);
            }
        }
        fetchData();
    }, [])

    return(
        <a href="/dashboard/profile" className="sidebar-user-info">
            <div className="sidebar-user-avatar">

            </div>
            <div className="sidebar-user-text">
                <strong>{user.firstName} {user.lastName}</strong>
                <p>User role</p>
            </div>
        </a>
    )
}