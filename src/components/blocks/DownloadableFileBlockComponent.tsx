import React from "react";
import { DownloadableFileBlock, File } from "@/payload-types";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "payload";
import config from '@payload-config'
import Image from "next/image";
import Link from "next/link";

const payload = await getPayload( {config} );

interface DownloadableFileBlockProps
{
    block: DownloadableFileBlock
}

export default async function DownloadableFileBlockComponent({ block }: DownloadableFileBlockProps )
{
    const file = block.file as File

    if(typeof file.filename === "undefined") return <></>

    const res = await payload.find({
        collection: "media",
        where: {
            filename: { like: "mime_" + file.mimeType?.split("/")[0] }
        }
    })

    const icon = res.docs[0]

    return(
        <div className="w-9/10 md:w-3/4 flex gap-2 items-center shadow rounded p-2 text-(--color-blue)">
            <Image
                src={icon.url as string}
                width={icon.width as number}
                height={icon.height as number}
                alt={icon.alt}
                loader={() => icon.url as string}
                className="h-[50px]! w-auto"
            />
            <p className="grow-1">{block.filename}</p>
            <Link href={file.url as string} download={file.filename} ><FontAwesomeIcon icon={faDownload} /></Link>
        </div>
    )
}