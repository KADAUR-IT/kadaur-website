import CVPageClient from "./page.client"
import React from "react"
import { getPayload, Where } from "payload";
import payloadConfig from "@/payload.config";
import { Cv } from "@/payload-types";
import { adminAuthClient } from "@/utils/auth/auth";
import { headers } from "next/headers";

const payload = await getPayload({ config: payloadConfig })

export default async function CVPage() {
    /*const cv = [{
        "id": 1,
        "title": "Data Coordinator",
        "createdAt": "2025-04-30"
        }, {
        "id": 2,
        "title": "Quality Engineer",
        "createdAt": "2024-12-06"
        }, {
        "id": 3,
        "title": "Mechanical Systems Engineer",
        "createdAt": "2025-10-09"
        }
    ]*/

    const getCV = async () => {
        
        const session = await adminAuthClient.getSession(
        { 
            headers: await headers()
        }
        )

        const user = await payload.findByID({
            collection: "users",
            //@ts-ignore
            id: session.data.user.id
        })

        const query: Where = {
            "generalInformations.prospect": {equals: user.id}
        }

        const cvRes = payload.find({
            collection: "cv",
            where: query
        })

        const cvs = (await cvRes).docs

        return cvs.length ? cvs : []
    }
    
    

    return(
        <>
            <CVPageClient cvList={await getCV()} />
        </>
    )

}