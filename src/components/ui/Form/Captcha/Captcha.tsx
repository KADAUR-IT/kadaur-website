'use client'

import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import "./styles.css"

interface CaptchaProps{
    ref: any
}

export default function Captcha({ref}: CaptchaProps)
{

    function onChange(value) {
        console.log("Captcha value:", value);
    }
    
    return(
        <div className="captcha-group">
            <ReCAPTCHA 
                ref={ref}
                sitekey="6LdUqdgrAAAAAMkJaRnNWBk776TKoFIPWJQ_ivmb"
                onChange={onChange}
            />
        </div>
    )
}