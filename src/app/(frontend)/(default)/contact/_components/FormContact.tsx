'use client'

import Checkbox from "@/components/ui/Form/Input/Checkbox";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import React, { useRef, useState } from "react";
import ContactSubmit from "./ContactSubmit";
import { stringify } from "querystring";
import { handleMail } from "../_actions/sendMail";
import ReCAPTCHA from "react-google-recaptcha";
import Captcha from "@/components/ui/Form/Captcha/Captcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function FormContact()
{

    const recaptchaRef = useRef(null)
    const errorRef = useRef(null)
    const [isFormValid, setFormValidity] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //recaptchaRef.current.execute();
        
        const formData = new FormData(e.target)
        formData.delete("g-recaptcha-response");
        const data = Object.fromEntries(formData.entries())

        console.log(data)

        if(!handleVerification(formData)){
            setFormValidity(false)
            return;
        }


        handleMail(stringify(data))
    }

    const handleVerification = (formData : FormData) => {
        if(recaptchaRef == null || recaptchaRef.current == null){
            return false;
        }

        if(recaptchaRef.current.getValue() == null || recaptchaRef.current.getValue().length == 0)
        {
            return false;
        }

        return true;
    }
    
    return(
        <form onSubmit={handleSubmit} className="form-part">
            <div ref={errorRef} className={"error-form" + ( !isFormValid ? "" : " hide" )}>
                <FontAwesomeIcon icon={faTimesCircle} />
                <p>Veuillez remplir tous les champs</p>
            </div>
            <Input id="entreprise" label="Entreprise" />
            <Input id="nom" label="Nom" />
            <Input id="mail" label="E-mail" type="mail" />
            <TextArea id="message" label="Message (optionnel)" />
            <Checkbox id="consent" label="Je consens à ce que mes informations soient traitées dans le cadre de ce formulaire." />
            <Captcha ref={recaptchaRef} />
            <ContactSubmit>Nous contacter !</ContactSubmit>
        </form>
    )
}