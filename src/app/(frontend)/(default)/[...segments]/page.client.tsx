"use client"

import { Block } from "payload"
import React, { JSX } from "react"

interface DynamicClientPageProps
{
    blocks: JSX.Element[] | undefined
}

export default function DynamicClientPage({blocks} : DynamicClientPageProps)
{
    return(
        <div className="dyn-pages">
            {blocks}
        </div>
    )
}