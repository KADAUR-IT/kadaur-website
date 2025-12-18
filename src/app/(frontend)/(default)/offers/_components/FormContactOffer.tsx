'use client'

import Checkbox from "@/components/ui/Form/Input/Checkbox";
import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import React, { useRef, useState } from "react";
import { stringify } from "querystring";
import Captcha from "@/components/ui/Form/Captcha/Captcha";
import SubmitForm from "@/components/ui/Form/Submit/SubmitForm";
import { handleMail } from "@/utils/sendMail";
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

        console.log(data)

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
        <form onSubmit={handleSubmit} className="offer-form">
            <h4>Discutons en ensemble !</h4>
            <Input id="entreprise" label="Entreprise" placeholder="KADAUR"/>
            <Input id="name" label="Nom" placeholder="Jean Dupont" />
            <Input id="mail" label="E-mail" type="mail" placeholder="nom@mail.com" />
            <TextArea id="message" label="Message" placeholder="" />
            <Captcha ref={recaptchaRef} />
            <SubmitForm buttonStyle="gold">Nous contacter !</SubmitForm>
        </form>
    )
}