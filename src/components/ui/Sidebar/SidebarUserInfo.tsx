'use client'

import { useSession } from "@/hooks/useSession";
import React, { useEffect, useState } from "react";

export default function SidebarUserInfo(){
    const [user, setUser] = useState({
        firstName: "Prénom",
        lastName: "Nom",

    })

    const {isSuccess, loading, data} = useSession()

    useEffect( () => {
        //console.log(isSuccess, loading, data)
        const getUserInfo = async () => {
            setUser(data.user)
        }

        if(!loading && isSuccess)
        {
            getUserInfo()
        }
       
    })

    return(
        <a href="/dashboard/profile" className="sidebar-user-info">
            <div className="sidebar-user-avatar">

            </div>
            <div className="sidebar-user-text">
                <strong>{user.firstName} {user.lastName}</strong>
                <p>User Role</p>
            </div>
        </a>
    )
}