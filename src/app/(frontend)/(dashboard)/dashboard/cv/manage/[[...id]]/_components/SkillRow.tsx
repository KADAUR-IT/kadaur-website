import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SkillRowProps
{
    index: string
    skillName?: string;
    categoryName?: string
    onDelete: (e: any) => void
} 

export default function SkillRow({index, skillName="", categoryName="", onDelete}: SkillRowProps)
{

    return(
        <tr>
            <td>
                <input name={`skill`} id={`skill-${index}`} defaultValue={skillName}  />
            </td>
            <td>
                <input name={`category`} id={`category-${index}`} defaultValue={categoryName} />
                
            </td>
            <td>
                <button onClick={onDelete} data-id={index}><FontAwesomeIcon icon={faTrash} className="text-red-600" /></button>
            </td>
        </tr>
    )
}