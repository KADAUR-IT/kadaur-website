import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Mail } from "@/payload-types";
import { graphClient } from "@/utils/microsoft/graphMail";

export async function GET(req: Request) {
    const payload = await getPayload({ config : configPromise })
    const { searchParams } = new URL(req.url);
    const env = process.env.ENVIRONMENT || 'development'

    let mailInterne = await payload.find({
        collection: "admins",
        where: {
        }
    })

    /*console.log(mailInterne.docs)

    console.log(searchParams)*/

    const form = await payload.findByID({
        collection: "forms",
        id: searchParams.get("form-id") as string,
    })

    const templates = form!.mailTemplates;

    if(!templates || templates.length == 0){
        return NextResponse.json({ status: 500, message: "Aucun template d'email n'est associé à ce formulaire" });
    }


    try{

        templates.forEach(async (template) => {
            let mailTemplate : Mail = template.mailTemplate as Mail
            let htmlContent = await getFileContent(mailTemplate.id as string);
            htmlContent = formatMessage(htmlContent, searchParams.entries())

            let mailTo: string[] = [];
            mailTemplate.to.forEach( async (to) => {
                switch(to){
                    case "client":
                    case "prospect":
                    case "partenaire":
                        mailTo.push(searchParams.get("mail") as string);
                        break;
                    case "interne":
                        mailTo.push(...mailInterne.docs.map((admin) => admin.email));
                        break;
                    default:
                        mailTo.push(searchParams.get("mail") as string);
                        break;
                }
            })


            const email = env === "development" ? await payload.sendEmail({
                to: searchParams.get("mail"),
                subject: mailTemplate.subject,
                html: htmlContent
            }) : await sendMail(mailTo, mailTemplate.subject, htmlContent);

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

const getFileContent = async (templateID: string) : Promise<string> => {
    let htmlContent = ""

    try{
        const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/preview/mails/${templateID}`);
        if(!res.ok){
            throw new Error("Failed to fetch mail template");
        }

        htmlContent = await res.text();
    } catch (error) {
        console.error("Error fetching mail template:", error);
    }
    
    return new Promise((resolve, reject) => {
        resolve(htmlContent);
    });
}

async function sendMail(to: string[], subject: string, content: string) {
    const toRecipients = to.map(email => ({
        emailAddress: { address: email }
    }))

    await graphClient.api('/users/hello@kadaur.com/sendMail').post({
        message: {
            subject,
            body: {
                contentType: 'HTML',
                content,
            },
            toRecipients
        },
    })
}