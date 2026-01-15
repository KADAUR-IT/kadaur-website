import React from "react";
import { DownloadableFileBlock, File } from "@/payload-types";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { getPayload } from "payload";
import config from '@payload-config'
import Image from "next/image";
import Link from "next/link";
import DownloadableFileClient from "./DownloadableFile/DownloadableFileClient";

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
        <DownloadableFileClient file={file} icon={icon} block={block} />
    )
}