import React from "react";
import LanguageRow from "./LanguageRow";
import Button from "@/components/ui/Button";
import ExperienceRow from "./ExperienceRow";

interface ExperienceSectionProps
{
    experienceList: number[],
    handlerAdd: (e: any) => void
    handlerRemove: (e: any) => void
}

export default function ExperienceSection({experienceList, handlerAdd, handlerRemove}: ExperienceSectionProps)
{

    const renderExperience = experienceList.map( (id, index) => {
        return(
            <ExperienceRow key={id} index={index} onDelete={handlerRemove} />
        )
    } )

    return(
        <div className="cv-form-step">
            <h2>Langues</h2>
            <p>Description</p>
            <div className="flex flex-col gap-2 table-form-cv w-full">
                {renderExperience}
            </div>
            <Button onClick={handlerAdd} className="w-full">Ajouter une experience</Button>
        </div>
    )
}