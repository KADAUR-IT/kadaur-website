'use client'

import React from "react";
import "./styles.css"
import CaptchaClient from "./CaptchaClient";

interface CaptchaProps{
    ref: any
}

export default function Captcha({ref}: CaptchaProps)
{

    const sitekey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITEKEY || ""
    
    return(
        <>
            <CaptchaClient ref={ref} sitekey={sitekey} />
        </>
    )
}