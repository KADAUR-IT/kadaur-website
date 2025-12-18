import { faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface LanguageRowProps
{
    index: number
    language?: string
    onDelete: (e: any) => void
}

export default function LanguageRow({index, language="", onDelete}: LanguageRowProps)
{
    return(
        <tr>
            <td>
                <input name={`language`} id={`language-${index}`} type="text" defaultValue={language}></input>
            </td>
            <td>
                <select name={`languageLevel`} id={`language-level-${index}`} >
                    <option value={0}>Faible</option>
                    <option value={1}>Intermédiaire</option>
                    <option value={2}>Courant</option>
                    <option value={3}>Professionel</option>
                    <option value={4}>Bilingue</option>
                </select>
            </td>
            <td>
                <button onClick={onDelete} data-id={index}><FontAwesomeIcon icon={faTrash} className="text-red-600" /></button>
            </td>
        </tr>
    )
}