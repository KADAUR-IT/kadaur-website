import React from "react";
import LanguageRow from "./LanguageRow";
import Button from "@/components/ui/Button";

interface LanguageSectionProps
{
    languageList: number[],
    handlerAdd: (e: any) => void
    handlerRemove: (e: any) => void
}

export default function LanguageSection({languageList, handlerAdd, handlerRemove}: LanguageSectionProps)
{

    const renderLanguage = languageList.map( (id) => {
        return(
            <LanguageRow key={id} index={id} onDelete={handlerRemove} />
        )
    } )

    return(
        <div className="cv-form-step">
            <h2>Langues</h2>
            <p>Description</p>
            <table className="table-auto w-full border-separate text-left table-form-cv">
                <thead>
                    <tr>
                        <th>Langue</th>
                        <th>Niveau</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderLanguage}
                </tbody>
            </table>
            <Button onClick={handlerAdd} className="w-full">Ajouter une langue</Button>
        </div>
    )
}