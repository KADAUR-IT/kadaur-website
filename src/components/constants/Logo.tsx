import Image from "next/image";
import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement>
{
    version: "normal" | "alternative"
}

export default function Logo({version = "normal", ...rest}: LogoProps)
{

    const logos = {
        "normal": {url: "/api/media/file/logo_kadaur.png", height: 300, width: 1309},
        "alternative" : {url: "/api/media/file/logo_kadaur_blanc.png", height: 300, width: 1309}
    }

    return(
        <>
            <Image 
                src={logos[version].url}
                height={logos[version].height}
                width={logos[version].width}
                alt="Logo KADAUR"
                {...rest}
            />
        </>
    )
}