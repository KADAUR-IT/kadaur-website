import React from "react";
import "./styles.css"
import "src/styles/pages.css"
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import InformationItem from "./_components/InformationItem";
import Checkbox from "@/components/ui/Form/Input/Checkbox";

import ContactSubmit from "./_components/ContactSubmit";
import FormContact from "./_components/FormContact";

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
                    <FormContact />
                </div>
            </div>
        </div>
    )
}