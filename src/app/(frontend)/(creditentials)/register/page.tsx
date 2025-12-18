'use client'

import Input from "@/components/ui/Form/Input/Input";
import { useRouter } from "next/dist/client/components/navigation";
import React, { useState } from "react";
import "src/styles/pages.css"
import "../_styles/creditentials.css"
import InfiniteScroll from "@/components/react-bits/InfiniteScroll/InfiniteScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCrosshairs, faEye, faHandHoldingHeart, faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { adminAuthClient } from "@/utils/auth/auth";
import Logo from "@/components/constants/Logo";

export default function RegisterPage()
{
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { password } = adminAuthClient.register()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if(passwordValue !== confirmPassword)
        {
            console.log("Les mots de passe ne correspondent pas");
            return;
        }

        /*const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then( (response) => {
            console.log(response);
            setIsLoading(false);
            if(response.ok) {
                console.log("Inscription réussie");
                //router.push("/dashboard");
            }else
            {
                console.log("Erreur lors de l'inscription");
            }
        })*/

        const res = await password({
            email,
            password: passwordValue,
            userInfo: {
                firstName: firstname,
                lastName: lastname
            },
            allowAutoSignin: true,
        })

        if(res.isError)
        {
            console.error(res.message)
        }
        
    }

    const items = [
        { content: <><p>RESPECT</p> <FontAwesomeIcon icon={faHandshakeAngle} /></> },
        { content: <><p>TRANSPARENCE</p> <FontAwesomeIcon icon={faEye} /></> },
        { content: <><p>BIENVEILLANCE</p> <FontAwesomeIcon icon={faHandHoldingHeart} /></> },
        { content: <><p>RIGUEUR</p> <FontAwesomeIcon icon={faCrosshairs} /></> },
        { content: <><p>RESPECT</p> <FontAwesomeIcon icon={faHandshakeAngle} /></> },
        { content: <><p>TRANSPARENCE</p> <FontAwesomeIcon icon={faEye} /></> },
        { content: <><p>BIENVEILLANCE</p> <FontAwesomeIcon icon={faHandHoldingHeart} /></> },
        { content: <><p>RIGUEUR</p> <FontAwesomeIcon icon={faCrosshairs} /></> },
        { content: <><p>RESPECT</p> <FontAwesomeIcon icon={faHandshakeAngle} /></> },
        { content: <><p>TRANSPARENCE</p> <FontAwesomeIcon icon={faEye} /></> },
        { content: <><p>BIENVEILLANCE</p> <FontAwesomeIcon icon={faHandHoldingHeart} /></> },
        { content: <><p>RIGUEUR</p> <FontAwesomeIcon icon={faCrosshairs} /></> },
    ];


    return(
        <div className="auth-pages">
            <form className="form-auth" onSubmit={handleSubmit}>
                <a href="/">
                    <Logo 
                        version="normal"
                        className="logo-auth"
                    />
                </a>
                <div className="header-auth">
                    <h1>Register</h1>
                    <p>Rejoignez dès maintenant KADAUR !</p>
                </div>
                <div className="flex gap-2">
                    <Input label="Prénom" type="text" id="firstname" placeholder="Votre prénom" onChange={(e) => setFirstname(e.target.value)} />
                    <Input label="Nom" type="text" id="lastname" placeholder="Votre nom" onChange={(e) => setLastname(e.target.value)} />
                </div>
                <Input label="Email" type="email" id="email" placeholder="Votre email" onChange={(e) => setEmail(e.target.value)} />
                <Input label="Password" type="password" id="password" placeholder="Votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <Input label="Confirm password" type="password" id="confirm-password" placeholder="Confirmez votre mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" disabled={isLoading}>{isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'S\'inscrire'}</button>
                                <hr />
                <p>Déjà un compte ? <a href="/login">Connectez-vous</a></p>
            </form>
            <div className="info-auth">
                <InfiniteScroll
                    items={items}
                    isTilted={true}
                    tiltDirection='left'
                    autoplay={true}
                    autoplaySpeed={0.5}
                    autoplayDirection="down"
                    pauseOnHover={false}
                />
            </div>
        </div>
    )
}