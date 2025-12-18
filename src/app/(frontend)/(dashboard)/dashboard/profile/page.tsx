'use client'

import Input from "@/components/ui/Form/Input/Input";
import { User } from "@/payload-types";
import React, { useEffect, useState } from "react";

export default function ProfilePage()
{
    const [user, setUser] = useState<User>()

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
        <div className="dashboard-main">
            <h1>Profil</h1>
            <div className="profil-header">
                <form>
                    <Input label="E-mail" type="email" id="email" placeholder="Votre email" defaultValue={user?.email} />
                    <Input label="Prénom" type="text" id="firstName" placeholder="Votre prénom" defaultValue={user?.firstName} />
                    <Input label="Nom" type="text" id="lastName" placeholder="Votre nom de famille" defaultValue={user?.lastName} />
                </form>
            </div>
        </div>
    )
}