import Button from "@/components/ui/Button";
import React from "react";
import SkillRow from "./SkillRow";

export interface CVSkill {
    id: string,
    skillLabel: string,
    skillCategory: string
}

interface SkillSectionProps
{
    skillList: CVSkill[],
    handlerAdd: (e: any) => void
    handlerRemove: (e: any) => void
}

export default function SkillSection({skillList, handlerAdd, handlerRemove}: SkillSectionProps)
{
    const renderSkill = skillList.map( (skill, index) => {
        return(
            <SkillRow skillName={skill.skillLabel} categoryName={skill.skillCategory} key={index} index={skill.id} onDelete={handlerRemove} />
        )
    } )

    return(
        <div className="cv-form-step">
            <h2>Compétences & expertises</h2>
            <p>Description</p>
            <table className="table-auto w-full border-separate text-left table-form-cv">
                <thead>
                    <tr>
                        <th>Compétence</th>
                        <th>Catégorie</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderSkill}
                </tbody>
            </table>
            <Button onClick={handlerAdd} className="w-full">Ajouter une compétence</Button>
        </div>
    )
}