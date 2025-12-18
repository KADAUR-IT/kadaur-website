import React from "react";
import "./styles.css"
import "src/styles/pages.css"
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import InformationItem from "./_components/InformationItem";

import FormContact from "./_components/FormContact";
import Image from "next/image";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

const payload = await getPayload({config: payloadConfig})

const res = await payload.find({
    collection: "pages", 
    where: {
        slug: {equals: "contact"}
    },
    limit: 1
})

const page = res.docs[0]

export const metadata = {
  title: page.meta?.title || "Contactez nous pour discuter de vos projets"
}

export default function ContactPage()
{

    return(
        <div className="dyn-pages">
            <div className="headtitle">
                <h1>Contact</h1>
                <h2>Nous sommes à votre écoute</h2>
            </div>

            <div className="contact-form relative">
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
                <div className="absolute max-w-[300px] bottom-0 left-0 p-[16px] hidden md:block">
                    <Image
                        src="/api/media/file/logo_kadaur_blanc.png"
                        height={300}
                        width={1309}
                        alt="Logo Kadaur blanc"
                    />
                </div>
            </div>
        </div>
    )
}