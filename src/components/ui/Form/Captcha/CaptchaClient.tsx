'use client'

import React from "react";
import ReCAPTCHA from "react-google-recaptcha"
import "./styles.css"

interface CaptchaClientProps{
    ref: any
    sitekey: string
}

export default function CaptchaClient({ref, sitekey}: CaptchaClientProps)
{

    function onChange(value: any) {
        console.log("Captcha value:", value);
    }
    
    return(
        <div className="captcha-group">
            <ReCAPTCHA 
                ref={ref}
                sitekey={sitekey}
                onChange={onChange}
            />
        </div>
    )
}