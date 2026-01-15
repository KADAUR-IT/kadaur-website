"use client"

import { DownloadableFileBlock, File, Media } from "@/payload-types"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface DownloadableFileClientProps{
    file: File,
    icon: Media,
    block : DownloadableFileBlock
}

export default function DownloadableFileClient({file, icon, block} : DownloadableFileClientProps)
{
    return(
        <div className="w-9/10 md:w-3/4 flex gap-2 items-center shadow rounded p-2 text-(--color-blue)">
            <Image
                src={icon.url as string}
                width={icon.width as number}
                height={icon.height as number}
                alt={icon.alt}
                className="h-[50px]! w-auto"
            />
            <p className="grow-1">{block.filename}</p>
            <Link href={file.url as string} download={file.filename} ><FontAwesomeIcon icon={faDownload} /></Link>
        </div>
    )
}