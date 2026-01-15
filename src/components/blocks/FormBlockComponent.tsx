"use client"

import { Form, FormBlock } from "@/payload-types";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "./blocks.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Input from "../ui/Form/Input/Input";
import TextArea from "../ui/Form/Input/TextArea";
import Checkbox from "../ui/Form/Input/Checkbox";
import Captcha from "../ui/Form/Captcha/Captcha";
import ContactSubmit from "@/app/(frontend)/(default)/contact/_components/ContactSubmit";
import Select from "../ui/Form/Input/Select";
import { handleMail } from "@/utils/sendMail";
import { stringify } from "querystring";

interface FormBlockProps{
    block: FormBlock
}

export default function FormBlockComponent({block} : FormBlockProps)
{
    const recaptchaRef = useRef(null)
    const errorRef = useRef(null)
    const [isFormValid, setFormValidity] = useState(true)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setFormSubmitted(true)
        
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

        setFormSubmitted(false)
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

    const form = block.form as Form;

    const formFields = form.fields || [];

    const renderFields = formFields.map((field) => {
        switch(field.type){
            case "text":
            case "email":
            case "number":
            case "date":
            case "tel":
                return <Input key={field.id} id={field.formID} label={field.label} type={field.type} placeholder={field.placeholder as string} />
            case "textarea":
                return <TextArea key={field.id} id={field.formID} label={field.label} placeholder={field.placeholder as string} />
            case "checkbox":
                return <Checkbox key={field.id} id={field.formID} label={field.label} />
            case "select":
                return (
                    <Select key={field.id} id={field.formID} label={field.label} >
                        {
                            field.options?.map((option, index) => {
                                return <option key={index} value={option.optionValue}>{option.optionLabel}</option>
                            })
                        }
                    </ Select>
                )
            default:
                return null;
        }
    })


    
    return(
        <form onSubmit={handleSubmit} className="form-part">
            <div ref={errorRef} className={"error-form" + ( !isFormValid ? "" : " hide" )}>
                <FontAwesomeIcon icon={faTimesCircle} />
                <p>Veuillez remplir tous les champs</p>
            </div>
            <input type="hidden" name="form-id" value={(block.form as Form).id as string} />
            {renderFields}
            <Captcha ref={recaptchaRef} />
            <ContactSubmit isLoading={formSubmitted}>{form.submitText}</ContactSubmit>
        </form>
    )
}