import React from "react";
import "./styles.css"
import "src/styles/pages.css"
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import InformationItem from "./_components/InformationItem";
import Checkbox from "@/components/ui/Form/Input/Checkbox";

import ContactSubmit from "./_components/ContactSubmit";

export default function ContactPage()
{

    return(
        <div className="dyn-pages">
            <div className="headtitle">
                <h1>Contact</h1>
                <h2>Nous sommes à votre écoute</h2>
            </div>

            <div className="contact-form">
                <h3 className="form-title">Discutons en ensemble !</h3>
                <div className="parts-wrapper">
                    <div className="information-part">
                        <h4>Nos coordonées</h4>
                        <InformationItem icon={faLocationDot} label="Adresse" value="3 rue Roland Garros, 94190, Villeneuve Saint-Georges" />
                        <InformationItem icon={faPhone} label="Téléphone" value="06 12 38 16 17" />
                        <InformationItem icon={faEnvelope} label="E-mail" value="hello@kadaur.com" />
                    </div>
                    <div className="form-part">
                        <Input id="entreprise" label="Entreprise" />
                        <Input id="Nom" label="Nom" />
                        <Input id="mail" label="E-mail" type="mail" />
                        <TextArea id="message" label="Message (optionnel)" />
                        <Checkbox id="consent" label="Je consens à ce que mes informations soient traitées dans le cadre de ce formulaire." />
                        <ContactSubmit>Nous contacter !</ContactSubmit>
                    </div>
                </div>
            </div>
        </div>
    )
}