'use client'

import React from "react";
/*import fs from "fs";
import axios from "axios";*/
import "src/styles/pages.css"


export default function TestPage()
{

    /*const payload = await getPayload({ config : payloadConfig })
    const res = await payload.find({
        collection: "pages"
    })

    const blocks = res.docs[0].block?.map( (block) => {
        return(
            <BlockComponent key={block.id} id={block.id as string} block={block}/>
        )
    } )*/

    var headers = {
      "Content-Type": "application/octet-stream",
      "apikey": "qwVZdGS07pGCKlBhWgHlof4WwRulYfjv",
    };

    /*var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: "@C:/Users/kylli/Downloads/CV_Alternance_DevWeb_2025_Kyllian.pdf"
    };*/

    /*fetch("https://api.apilayer.com/resume_parser/upload", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));*/

    /*const filePath = "C:/Users/kylli/Downloads/CV_DJDP_2025_Sylvie_GERMANY.pdf"
    const fileData = fs.createReadStream(filePath);*/

    /*try{
        const response = await axios.post("https://api.apilayer.com/resume_parser/upload", fileData, {headers});
        console.log("✅ Résultat parsé :", response.data);
    } catch (error) {
        console.error("❌ Erreur lors du parsing :", error);
    }*/

    /*const options = {
        method: 'GET',
        url: 'https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume/job/status/40b62cf9-00d2-4039-91ca-c2bdaa042bcd',
        headers: {
            'apy-token': 'APY0MovWLbJFabGHYhsZgbV13i4YYWBDASBbOllnNsN0bfx58qNYxRQu2umkZBFSMXh1qXsUcR',
            'Content-Type': 'application/json'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });*/

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        console.log(data)
    }


    return(
        <>
            <div className="dyn-pages">
                <form onSubmit={handleSubmit} encType="multipart/form-data"  >
                    <input name="cv" type="file" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}