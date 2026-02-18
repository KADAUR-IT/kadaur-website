"use client"

import { useState, useEffect } from "react"
import { hasCookie, setCookie } from "cookies-next"

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect( () => {
        if(!hasCookie("kadaur_cookie_consent")) {
            setIsVisible(true);
        }
    }, [])

    const handleAccept = () => {
        setCookie("kadaur_cookie_consent", "true", { maxAge : 60 * 60 * 24 * 365 * 2});
        setIsVisible(false)
    }

    const handleDecline = () => {
        setCookie("kadaur_cookie_consent", "false", { maxAge : 60 * 60 * 24 * 365 * 2});
        setIsVisible(false)
    }

    if(!isVisible) return null;

    return (
        <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-2000">
            <p>Nous utilisons des cookies pour améliorer votre expérience.</p>
            <div className="gap-2 flex">
                <button onClick={handleDecline} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-all transition-300 cursor-pointer">Refuser</button>
                <button onClick={handleAccept} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-all transition-300 cursor-pointer">Accepter</button>
            </div>
        </div>
    )
}