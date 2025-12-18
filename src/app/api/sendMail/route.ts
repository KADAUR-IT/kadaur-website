import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import path from "path";
import fs from "fs"

export async function GET(req: Request) {
    const payload = await getPayload({ config : configPromise })
    const { searchParams } = new URL(req.url);
    //const search = searchParams.get("entreprise") || "";

    //console.log(searchParams)

    try{
        let htmlContent = getFileContent("src/templates/mails/contactAR.html");

        const emailAR = await payload.sendEmail({
            to: searchParams.get("mail"),
            subject: "Accusé de réception de votre demande de contact",
            html: htmlContent
        })
    
        htmlContent = getFileContent("src/templates/mails/contactKadaur.html");

        htmlContent = formatMessage(htmlContent, searchParams.entries())

        const emailKadaur = await payload.sendEmail({
            to: "hello@kadaur.com",
            subject: "Demande de contact - " + searchParams.get("entreprise"),
            html: htmlContent
        })
    
        const lead = await payload.create({
            collection: "leads",
            data: {
                name: searchParams.get("name") as string,
                entreprise: searchParams.get("entreprise") as string,
                mail: searchParams.get("mail") as string,
            }
        })
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Une erreur est survenu lors de l'envoie du message", error });
    }

    return NextResponse.json({ status: 200, message: "Message envoyé avec succés" });
}


const formatMessage = (template: string, parameters: URLSearchParamsIterator<[string, string]>): string => {
    var formattedMessage = template
    
    parameters.forEach((param) => {
        formattedMessage = formattedMessage.replaceAll("${"+ param[0] +"}", param[1])
    })

    return formattedMessage
}

const getFileContent = (filepath: string) : string => {
    var pathSplit = filepath.split("/");

    var templatePath = path.join(process.cwd(), ...pathSplit);

    let htmlContent = fs.readFileSync(templatePath, 'utf8');

    return htmlContent
}