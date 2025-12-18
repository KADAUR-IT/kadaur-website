import Button from "@/components/ui/Button";
import React from "react";
import FormationRow from "./FormationRow";

interface FormationSectionProps
{
    formationIDs: number[]
    handlerAdd: (e: any) => void
    handlerRemove: (e: any) => void
}

export default function FormationSection({formationIDs, handlerAdd, handlerRemove}: FormationSectionProps)
{

    const renderFormation = formationIDs.map( (id) => {
        return(
            <FormationRow key={id} index={id} onDelete={handlerRemove} />
        )
    } )

    return(
        <div className="cv-form-step">
            <h2>Formations & certifications</h2>
            <p>Description</p>
            <table className="table-auto w-full border-separate text-left table-form-cv">
                <thead>
                    <tr>
                        <th>Année de départ</th>
                        <th>Année de fin</th>
                        <th>Nom</th>
                        <th>Organisme</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderFormation}
                </tbody>
            </table>
            <Button onClick={handlerAdd} className="w-full">Ajouter une formations</Button>
        </div>
    )
}