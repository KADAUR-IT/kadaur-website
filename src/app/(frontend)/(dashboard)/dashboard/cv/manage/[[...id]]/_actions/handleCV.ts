import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

const payload = await getPayload({ config: payloadConfig })

export const createCV = (formData: FormData) =>
{
    const skillsList = [] 
    const formationsList = [] 
    const languagesList = [] 
    const experiencesList = []

    const skillsInput = formData.getAll("skill")
    const skillsCategoryInput = formData.getAll("category")

    for( let index = 0; index < skillsInput.length ; index++)
    {
        console.log(skillsInput[index], skillsCategoryInput[index])
    }
}