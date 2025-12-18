"use client"

import TextArea from "@/components/ui/Form/Input/TextArea";
import Stepper from "@/components/ui/Stepper/Stepper";
import React, { useState } from "react";
import FormationSection from "./_components/FormationSection";
import SkillSection from "./_components/SkillSection";
import LanguageSection from "./_components/LanguageSection";
import ExperienceSection from "./_components/ExperienceSection";
import { Cv } from "@/payload-types";

interface CVManageClientProps
{
    cv: Cv | null;
}

export default function CVManageClient({cv} : CVManageClientProps)
{

    const [currentStep, setCurrentStep] = useState(0)
    const steps = ["Synthèse", "Compétences", "Formations", "Langues", "Experiences"]
    const [heightForm, setHeightForm] = useState(324)
    const [syntheseValue, setSyntheseValue] = useState(cv ? cv.synthese?.synthesis : "")
    const [formationIDs, setFormationIDs] = useState(cv && cv.formations!.formationsList ? cv.formations!.formationsList.map( (f) => f.id ) : [] as any[])
    const [lastformationID, setLastFormationID] = useState(-1)
    const [skillIDs, setSkillIDs] = useState(cv && cv.skills!.skillsList ? cv.skills!.skillsList : [] as any[])
    const [lastSkillID, setLastSkillID] = useState(-1)
    const [languageIDs, setLanguageIDs] = useState(cv && cv.languages!.languagesList ? cv.languages!.languagesList.map( (f) => f.id ) : [] as any[])
    const [lastLanguageID, setLastLanguageID] = useState(-1)
    const [experienceIDs, setExperienceIDs] = useState(cv && cv.experiences!.experiencesList ? cv.experiences!.experiencesList.map( (f) => f.id ) : [] as any[])
    const [lastExperienceID, setLastExperienceID] = useState(-1)

    const handleChangeStep = (nextStep: number) => 
    {
        if(nextStep === steps.length)
        {
            const form = document.getElementById('cv-form') as HTMLFormElement
            if(form)
            {
                handleSubmit(form)
                return;
            }
        }

        const temp = Math.min(Math.max(nextStep, 0), steps.length-1)
        setCurrentStep(temp)
        const element = document.querySelectorAll(".cv-form-step")[temp]

        if(element)
        {
            setHeightForm(element.getBoundingClientRect().height)
            element.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
        }
    }

    const handleAddFormation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setFormationIDs([...formationIDs, lastformationID + 1])
        setLastFormationID(lastformationID + 1)
    }

    const handleRemoveFormation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setFormationIDs(formationIDs.filter( (id) => id !== parseInt(e.currentTarget.dataset.id as string) ))
    }

    const handleAddSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setSkillIDs([...skillIDs, {id: `${lastSkillID + 1}`, skillLabel: "", skillCategory: ""}])
        setLastSkillID(lastSkillID + 1)
    }

    const handleRemoveSkill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setSkillIDs(skillIDs.filter( (skill) => skill.id !== (e.currentTarget.dataset.id as string) ))
        console.log(skillIDs.filter( (skill) => skill.id !== (e.currentTarget.dataset.id as string) ))
    }

    const handleAddLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setLanguageIDs([...languageIDs, lastLanguageID + 1])
        setLastLanguageID(lastLanguageID + 1)
    }

    const handleRemoveLangue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setLanguageIDs(languageIDs.filter( (id) => id !== parseInt(e.currentTarget.dataset.id as string) ))
    }

    const handleAddExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setExperienceIDs([...experienceIDs, lastExperienceID + 1])
        setLastExperienceID(lastExperienceID + 1)
    }

    const handleRemoveExperience = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setExperienceIDs(experienceIDs.filter( (id) => id !== parseInt(e.currentTarget.dataset.id as string) ))
    }

    const handleSubmit = async (form: HTMLFormElement ) => 
    {

        const inputs = document.querySelectorAll("#cv-form input, #cv-form textarea")

        var firstElement: HTMLElement | null = null;
        inputs.forEach( (input) => {
            const element = (input as HTMLInputElement);

            console.log(element.id, element.value !== "");
            element.classList.remove("border-red-600!", "shadow-red-200!", "shadow-md!", "border!");
            if(element.value === "")
                {
                firstElement = !firstElement ? element.closest(".cv-form-step") : firstElement;
                element.classList.add("border-red-600!", "shadow-red-200!", "shadow-md!", "border!");
            }
        })

        if(firstElement){
            (firstElement as HTMLElement).scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
            document.querySelectorAll(".cv-form-step").forEach( (el, index) => { if(el === firstElement)  setCurrentStep(index)}  )
            return
        } 
        const formData = new FormData(form)

        /*for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }*/

        try{
            const response = await fetch("/api/kadaur/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const res = await response.json();
            formData.append("prospect", res.user.id )
            console.log("User data:", res);
        }catch(err)
        {
            console.error("Error fetching user data:", err);
        }

        var object: any = {};
        formData.forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if(!Reflect.has(object, key)){
                object[key] = [value];
                return;
            }
            if(!Array.isArray(object[key])){
                object[key] = [object[key]];    
            }
            object[key].push(value);
        });
        var json = JSON.stringify(object);

        try{
            const req = await fetch("/api/cv/createCV", {
                method: "POST",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: json
            })

            const data = await req.json()
            console.log(data)
        }catch(error)
        {
            console.log(error)
        }
    }

    

    return(
        <div className="dashboard-home">
            <div className="cv-stepper">
                <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>
            
            <form id="cv-form" className="cv-slider">
                <div className="cv-form-step">
                    <h2>Synthèse de parcours</h2>
                    <p>Description</p>
                    <TextArea id="synthese" label="Synthèse" defaultValue={syntheseValue} rows={6}/>
                </div>
                <SkillSection skillList={skillIDs} handlerAdd={handleAddSkill} handlerRemove={handleRemoveSkill} />
                <FormationSection formationIDs={formationIDs} handlerAdd={handleAddFormation} handlerRemove={handleRemoveFormation} />
                <LanguageSection languageList={languageIDs} handlerAdd={handleAddLanguage} handlerRemove={handleRemoveLangue} />
                <ExperienceSection experienceList={experienceIDs} handlerAdd={handleAddExperience} handlerRemove={handleRemoveExperience} />
                
            </form>

            <div className={" cv-actions"}>
                <button onClick={() => handleChangeStep(currentStep - 1)} disabled={currentStep === 0}>Retour</button>
                <button onClick={() => handleChangeStep(currentStep + 1)}>Continuer</button>
            </div>
        </div>
    )
}