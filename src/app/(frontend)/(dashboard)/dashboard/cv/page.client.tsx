"use client"

import { Cv } from "@/payload-types";
import { convertDate } from "@/utils/dateUtils";
import { faInfo, faMagnifyingGlass, faPen, faPlus, faSliders, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {  useState } from "react";

interface CVPageClientProps
{
    cvList: Cv[]
}

export default function CVPageClient({cvList}: CVPageClientProps) {
    const cv = [{
        "id": 1,
        "title": "Data Coordinator",
        "createdAt": "2025-04-30"
        }, {
        "id": 2,
        "title": "Quality Engineer",
        "createdAt": "2024-12-06"
        }, {
        "id": 3,
        "title": "Mechanical Systems Engineer",
        "createdAt": "2025-10-09"
        }
    ]

    const [cvFiltered, setCVFiltered] = useState(cvList)
    

    const dateOptions : Intl.DateTimeFormatOptions = {day:"numeric", month: "numeric", year : "numeric"}
    const cvRendered = cvFiltered.map( (cv) => {
        return(
            <tr key={cv.id} id={`cv-${cv.id}`}>
                <td>
                    <input type="checkbox" data-id={`cv-${cv.id}`} />
                </td>
                <td>
                    {cv.generalInformations.title}
                </td>
                <td>
                    {convertDate(cv.createdAt, dateOptions)}
                </td>
                <td className="table-actions">
                    <button data-id={cv.id} ><FontAwesomeIcon icon={faInfo} /></button>
                    <a href={`/dashboard/cv/manage/${cv.id}`} data-id={cv.id} ><FontAwesomeIcon icon={faPen} /></a>
                    <button data-id={cv.id} className="btn-delete" ><FontAwesomeIcon icon={faTimes} /></button>
                </td>
            </tr>
        )
    } )

    

    return(
        <div className="dashboard-home">
            <h1>CV</h1>
            
            <div className="cv-list-header">
                <div className="header-left">
                    <div className="cv-actionbar">
                        <a className="btn-actionbar" href="/dashboard/cv/manage"><FontAwesomeIcon icon={faPlus}/> Ajouter</a>
                        <button className="btn-actionbar btn-delete" ><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
                    </div>
                </div>
                <div className="header-right">
                    <div className="cv-searchbar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Rechercher un CV..." />
                        <button ><FontAwesomeIcon icon={faSliders} /></button>
                    </div>
                </div>
            </div>
            
            <div className="cv-list">
                <table className="cv-table">
                    <thead>
                        <tr>
                            <th style={{width: 0}}>
                                <input type="checkbox" />
                            </th>
                            <th className="main-td">
                                Titre du CV
                            </th>
                            <th >
                                Créé le
                            </th>
                            <th style={{width: 0}}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cvRendered}
                    </tbody>
                </table>
            </div>

        </div>
    )

}