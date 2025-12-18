import React from "react";
import VisitCard from "./_components/VisitCard/VisitCard";
import Logo from "@/components/constants/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import NavLink from "./_components/NavLink/NavLink";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const payload = await getPayload({ config: payloadConfig })

export default async function LinkTreePage()
{
    const linktreeData = await payload.findGlobal({
        slug: "linktree"
    })

    const smIcon = new Map([
        ['youtube', faYoutube],
        ['facebook', faFacebookSquare],
        ['x', faXTwitter],
        ['instagram', faInstagram],
        ['linkedin', faLinkedin],
    ]);

    const socialMediaArray = linktreeData.socialMedia!.socialMediaArray!.map( (sm, index) => {
        return(
            <FontAwesomeIcon key={index} icon={smIcon.get(sm.socialMedia!.toLocaleLowerCase()) as IconProp} className="h-[32px]" />
        )
    } )

    const linksArray = linktreeData.links!.linksArray!.map( (link, index) => {
        return(
            <NavLink key={index} large={link.isLarge as boolean} href={link.link as string}>{link.label as string}</NavLink> 
        )
    } )

    return(
        <div className="flex flex-col gap-2 items-center max-w-xl bg-(--color-blue) min-h-screen w-full rounded p-2 ">
            <Logo version="alternative" className={"w-[50%]"} />
            <h1 className="text-(--color-white)! m-0! text-center">KADAUR</h1>
            <h2 className="text-(--color-white)! text-center">Expert en gestion et en pilotage de projets IT et spécialisé en Infrastructure.</h2>
            <div className="flex items-center justify-center gap-4 p-4">
                {socialMediaArray}
            </div>
            <VisitCard />

            <div className="flex flex-col gap-2 w-full">
                {linksArray}
            </div>
        </div>
    )
}