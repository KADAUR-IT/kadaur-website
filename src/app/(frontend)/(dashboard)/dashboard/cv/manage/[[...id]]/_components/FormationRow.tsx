import Input from "@/components/ui/Form/Input/Input";
import { faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface FormationRowProps
{
    index: number
    startingYear?: string
    endingYear?: string
    formationName?: string
    organism?: string
    onDelete : (e: any) => void
}

export default function FormationRow({index, startingYear = "", endingYear = "", formationName = "", organism = "", onDelete}: FormationRowProps)
{
    return(
        <tr>
            <td>
                <input name={`formationStartDate`} id={`year-start-${index}`} type="date" defaultValue={startingYear} />
            </td>
            <td>
                <input name={`formationEndDate`} id={`year-end-${index}`} type="date" defaultValue={endingYear} />
            </td>
            <td>
                <input name={`formationName`} id={`name-${index}`} defaultValue={formationName} />
            </td>
            <td>
                <input name={`formationOrganism`} id={`organism-${index}`} defaultValue={organism} />
            </td>
            <td>
                <button onClick={onDelete} data-id={index}><FontAwesomeIcon icon={faTrash} className="text-red-600" /></button>
            </td>
        </tr>
    )
}