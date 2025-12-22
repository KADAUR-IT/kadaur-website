import React from "react";
import VisitCard from "./_components/VisitCard/VisitCard";
import Logo from "@/components/constants/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "./_components/NavLink/NavLink";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)

const payload = await getPayload({ config: payloadConfig })

const settings = await payload.findGlobal({
    slug: "settings"
})

export default async function LinkTreePage()
{
    const linktreeData = await payload.findGlobal({
        slug: "linktree"
    })

    const socialMedia = settings.general?.socialMedia || []

    const socialMediaArray = socialMedia.map( (sm, index) => {
        return(
            <a key={sm.id} href={sm.socialMediaLink as string}><FontAwesomeIcon icon={sm.socialMediaSelect as IconProp} className="h-[32px]" /></a>
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