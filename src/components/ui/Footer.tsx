import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <Image
                    alt="Kadaur Logo"
                    height={64}
                    src="/api/media/file/logo-kadaur.png"
                    width={245}
                />
            </div>
            <div className="footer-center">
                <h2>KADAUR</h2>
                <div className="footer-contact">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>3 rue Roland Garros, 94190, Villeneuve Saint-Georges</p>
                    <FontAwesomeIcon icon={faPhone} />
                    <p>06 12 38 16 17</p>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>hello@kadaur.com</p>
                </div>
            </div>
            <div className="footer-right">
                <a>Contact</a>
                <a>Notre équipe</a>
                <a>Nous rejoindre</a>
                <div>
                    <FontAwesomeIcon icon={faLinkedin} />
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Kadaur. All rights reserved.</p>
                <div className="footer-legal">
                    <a>Mentions légales</a>
                    <a>Politique de confidentialité</a>
                    <a>Politiques de cookies (UE)</a>
                </div>
            </div>
        </footer>
    )
}