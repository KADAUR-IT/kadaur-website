import Input from "@/components/ui/Form/Input/Input";
import TextArea from "@/components/ui/Form/Input/TextArea";
import { faCaretDown, faCaretUp, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ExperienceRowProps
{
    index: number
    language?: string
    onDelete: (e: any) => void
}

export default function ExperienceRow({index, language="", onDelete}: ExperienceRowProps)
{

    const [isOpen, setOpen] = useState(false)

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
    {
        e.preventDefault()
        const el = document.getElementById(e.currentTarget.dataset.id as string)

        if(el)
        {
            setOpen(!isOpen)
            el.classList.toggle("h-full")
            el.classList.toggle("overflow-hidden")
        }
    }

    return(
        <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
                <h3>Experience {index}</h3>
                <div className="flex gap-2">
                    <button onClick={onDelete} data-id={index}><FontAwesomeIcon icon={faTrash} className="text-red-600" /></button>
                    <button onClick={handleOpen} data-id={`experience-${index}`}><FontAwesomeIcon icon={faCaretDown} className={(isOpen ? "rotate-180 " : "") + "rotate-0 transition-all duration-300"} /></button>
                </div>
            </div>
            <div className="flex flex-col gap-2 max-h-max h-0 overflow-hidden" id={`experience-${index}`}>
                <Input label="Titre du poste" id={`jobTitle`} defaultValue='' />
                <Input label="Nom de l'entreprise" type="text" id={`jobEntreprise`} defaultValue='' />
                <div className="flex gap-2 w-full">
                    <Input label="Date de début" type="date" id={`jobStartDate`} defaultValue='' />
                    <Input label="Date de fin" type="date" id={`jobEndDate`} defaultValue='' />
                </div>
                <TextArea id={`jobDescription`} label="Description" rows={6}></TextArea>
            </div>
        </div>
    )
}