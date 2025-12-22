import { faEllipsisVertical, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface NavLinkProps
{
    href: string,
    large?: boolean,
    children: ReactNode
}

export default function NavLink({href, large=false, children}: NavLinkProps)
{
    const borderRadius = large ? 'rounded-[30px]' : 'rounded-[50px]';

    return(
        <Link className={`w-full text-(--color-white) border-(--color-white) border-[1px] ${borderRadius} overflow-hidden font-bold transition-all duration-300 hover:bg-[#f5f5f521]`} href={href}>
            <Image
                src={"/api/media/file/hero_image.jpg"}
                width={1200}
                height={675}
                alt="Thumbnail navlink"
                className={`${large ? "" : "hidden!"}`}
            />
            <div className="flex items-center p-2">
                <FontAwesomeIcon icon={faLink} className={`h-[32px] ${large ? "hidden!" : ""}`} />
                <p className="grow-1 text-center">{children}</p>
                <FontAwesomeIcon icon={faEllipsisVertical} className="h-[24px] mr-3" />
            </div>
        </Link>
    )
}