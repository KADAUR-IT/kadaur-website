import React, {ReactElement } from "react"
import {RichText as RichTextConverter} from "@payloadcms/richtext-lexical/react"
import type {SerializedEditorState} from "@payloadcms/richtext-lexical/lexical"

type RichTextProps = {
    data: SerializedEditorState
    className?: string
}

export default function RichText({data, className} : RichTextProps) : ReactElement
{
    return(
        <RichTextConverter data={data} className={`payload-richtext ${className}`} />
    )
}