import React from "react";
import CVManageClient from "./page.client";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export default async function CVManage({ params }: { params: Promise<{id: string}> })
{
    const {id} = await params;

    var cv = null
    
    if(id){
        const payload = await getPayload({ config : payloadConfig })
        cv = await payload.findByID({
            collection: "cv",
            id: id[0]
        })
    }
    



    return(
        <CVManageClient cv={cv} />
    )
}