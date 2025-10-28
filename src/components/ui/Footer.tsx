import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <Image
                        alt="Kadaur Logo"
                        width={1366}
                        height={485}
                        src="/api/media/file/logo_kadaur_blanc"
                    />
                    <p>Nous sommes les maillons d'une même chaîne</p>
                    <div className="footer-social-media">
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faXTwitter} />
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
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
                    <a href="/contact">Contact</a>
                    <a href="/about/nos-equipes">Notre équipe</a>
                    <a href="/join-us">Nous rejoindre</a>
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