'use client'

import Input from "@/components/ui/Form/Input/Input";
import { useRouter } from "next/dist/client/components/navigation";
import React, { useState } from "react";
import "src/styles/pages.css"
import "../_styles/creditentials.css"
import Image from "next/image";
import InfiniteScroll from "@/components/react-bits/InfiniteScroll/InfiniteScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCrosshairs, faEye, faHandHoldingHeart, faHandshakeAngle, faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/kadaur/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then( (response) => {
            console.log(response);
            setIsLoading(false);
            if(response.ok) {
                console.log("Connexion réussie");
                router.push("/dashboard");
            }else
            {
                console.log("Erreur lors de la connexion");
                setError("Email ou mot de passe incorrect");
            }
        })

        
    }


    return(
        <div className="auth-pages">
            <form className="form-auth" onSubmit={handleSubmit}>
                <a href="/">
                    <Image
                        alt="Kadaur Logo"
                        height={64}
                        src="/api/media/file/logo-kadaur.png"
                        width={245}
                        className="logo-auth"
                    />
                </a>
                <div className="header-auth">
                    <h1>Login</h1>
                    <p>Connectez vous à votre espace KADAUR</p>
                </div>
                <div className={`error-auth ${error ? '' : 'hide'}`}>
                    <FontAwesomeIcon icon={faWarning} />
                    <p>{error}</p>
                </div>
                <Input label="E-mail" type="email" id="email" placeholder="Votre email" onChange={(e) => setEmail(e.target.value)} />
                <Input label="Mot de passe" type="password" id="password" placeholder="Votre mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={isLoading}>{isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Se connecter'}</button>
                <hr />
                <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous</a></p>
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