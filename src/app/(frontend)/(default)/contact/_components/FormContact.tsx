'use client'

import Checkbox from "@/components/ui/Form/Input/Checkbox";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import React, { useRef, useState } from "react";
import ContactSubmit from "./ContactSubmit";
import { stringify } from "querystring";
import { handleMail } from "@/utils/sendMail";
import Captcha from "@/components/ui/Form/Captcha/Captcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function FormContact()
{

    const recaptchaRef = useRef(null)
    const errorRef = useRef(null)
    const [isFormValid, setFormValidity] = useState(true)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        //recaptchaRef.current.execute();
        
        const formData = new FormData(e.target)
        formData.delete("g-recaptcha-response");
        const data = Object.fromEntries(formData.entries())

        //console.log(data)

        if(!handleVerification(formData)){
            setFormValidity(false)
            return;
        }

        try{
            //@ts-ignore
            const res = await handleMail(stringify(data))

            const toastNotify = res.status === 200 ? toast.success : toast.error
            toastNotify(res.message, {
                position: "bottom-right",
            })

            
        }catch(error)
        {
            console.error(error)
        }

        

        
    }

    const handleVerification = (formData : FormData) => {
        if(recaptchaRef == null || recaptchaRef.current == null){
            return false;
        }

        //@ts-ignore
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
            <Input id="name" label="Nom" />
            <Input id="mail" label="E-mail" type="mail" />
            <TextArea id="message" label="Message (optionnel)" />
            <Checkbox id="consent" label="Je consens à ce que mes informations soient traitées dans le cadre de ce formulaire." />
            <Captcha ref={recaptchaRef} />
            <ContactSubmit>Nous contacter !</ContactSubmit>
        </form>
    )
}