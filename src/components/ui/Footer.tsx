import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)
import Logo from "../constants/Logo";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

export default async function Footer() {
    const payload = await getPayload({ config: payloadConfig })
    const links = (await payload.findGlobal({
        slug: "settings"
    })).general?.socialMedia || []

    const thisYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <Logo 
                        version="alternative"
                    />
                    <p>Nous sommes les maillons d'une même chaîne</p>
                    <div className="footer-social-media">
                        {links.map( (link) => {
                            return(
                                <a key={link.id} href={link.socialMediaLink as string}><FontAwesomeIcon icon={link.socialMediaSelect as IconProp} /></a>
                            )
                        } )}
                        
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
                    <h2>Liens utiles</h2>
                    <div className="flex flex-col gap-[16px]">
                        <a href="/contact">Contact</a>
                        <a href="/about/nos-profils">Notre équipe</a>
                        <a href="/contact">Nous rejoindre</a>
                    </div>
                    
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© {thisYear} Kadaur. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="/mentions-legales">Mentions légales</a>
                    <a href="/politiques-confidentialites">Politique de confidentialité</a>
                    <a href="/politiques-cookies">Politiques de cookies (UE)</a>
                </div>
            </div>
        </footer>
    )
}