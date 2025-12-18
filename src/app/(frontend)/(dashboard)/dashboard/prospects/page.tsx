'use client';

import { faCheck, faEllipsisVertical, faEye, faEyeSlash, faFilter, faInfo, faMagnifyingGlass, faPaperPlane, faRotate, faRotateLeft, faSliders, faUser, faUserCheck, faUserPlus, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CircularProgressBar from "./_components/CircularProgressBar";
import { convertDate } from "@/utils/dateUtils";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button";
import Metric from "@/components/ui/Dashboard/Metric";
import Input from "@/components/ui/Form/Input/Input";
import Select from "@/components/ui/Form/Input/Select";

export default function ProspectsPage() {
    const fakeUser = [{
  "id": 1,
  "first_name": "Tull",
  "last_name": "Ricker",
  "email": "tricker0@about.com",
  "job": "Accountant III",
  "phone_number": "1663548892",
  "pertinence": 97,
  "createdAt": "2025-01-02"
}, {
  "id": 2,
  "first_name": "Aloin",
  "last_name": "Pestricke",
  "email": "apestricke1@hao123.com",
  "job": "Chemical Engineer",
  "phone_number": "9808209242",
  "pertinence": 76,
  "createdAt": "2024-12-08"
}, {
  "id": 3,
  "first_name": "Park",
  "last_name": "Threader",
  "email": "pthreader2@over-blog.com",
  "job": "Research Nurse",
  "phone_number": "1853822700",
  "pertinence": 41,
  "createdAt": "2025-04-08"
}, {
  "id": 4,
  "first_name": "Germain",
  "last_name": "Phaup",
  "email": "gphaup3@stanford.edu",
  "job": "Accounting Assistant III",
  "phone_number": "4972164809",
  "pertinence": 94,
  "createdAt": "2025-02-19"
}, {
  "id": 5,
  "first_name": "Ilka",
  "last_name": "Pollock",
  "email": "ipollock4@army.mil",
  "job": "Design Engineer",
  "phone_number": "7899320411",
  "pertinence": 18,
  "createdAt": "2025-08-17"
}, {
  "id": 6,
  "first_name": "Kerby",
  "last_name": "Minillo",
  "email": "kminillo5@netscape.com",
  "job": "VP Marketing",
  "phone_number": "5971206136",
  "pertinence": 72,
  "createdAt": "2025-01-05"
}, {
  "id": 7,
  "first_name": "Meggy",
  "last_name": "Postles",
  "email": "mpostles6@tinyurl.com",
  "job": "VP Product Management",
  "phone_number": "2881001418",
  "pertinence": 75,
  "createdAt": "2025-01-05"
}, {
  "id": 8,
  "first_name": "Devan",
  "last_name": "Dunlea",
  "email": "ddunlea7@ca.gov",
  "job": "Community Outreach Specialist",
  "phone_number": "4441033725",
  "pertinence": 25,
  "createdAt": "2025-09-23"
}, {
  "id": 9,
  "first_name": "Ive",
  "last_name": "Killock",
  "email": "ikillock8@epa.gov",
  "job": "Systems Administrator IV",
  "phone_number": "7442721565",
  "pertinence": 51,
  "createdAt": "2025-10-16"
}, {
  "id": 10,
  "first_name": "Travers",
  "last_name": "Lownes",
  "email": "tlownes9@pcworld.com",
  "job": "Recruiting Manager",
  "phone_number": "7693845855",
  "pertinence": 90,
  "createdAt": "2025-01-29"
}, {
  "id": 11,
  "first_name": "Thekla",
  "last_name": "Hiley",
  "email": "thileya@quantcast.com",
  "job": "Sales Representative",
  "phone_number": "3576653249",
  "pertinence": 29,
  "createdAt": "2025-05-30"
}, {
  "id": 12,
  "first_name": "Rudy",
  "last_name": "Frampton",
  "email": "rframptonb@soup.io",
  "job": "Recruiter",
  "phone_number": "6336317473",
  "pertinence": 60,
  "createdAt": "2024-12-15"
}, {
  "id": 13,
  "first_name": "Bartlet",
  "last_name": "Hance",
  "email": "bhancec@tripadvisor.com",
  "job": "Editor",
  "phone_number": "2284894604",
  "pertinence": 40,
  "createdAt": "2024-11-23"
}, {
  "id": 14,
  "first_name": "Wakefield",
  "last_name": "Sawbridge",
  "email": "wsawbridged@statcounter.com",
  "job": "Community Outreach Specialist",
  "phone_number": "1251631358",
  "pertinence": 54,
  "createdAt": "2025-08-03"
}, {
  "id": 15,
  "first_name": "Vernen",
  "last_name": "Rodolfi",
  "email": "vrodolfie@hud.gov",
  "job": "Recruiting Manager",
  "phone_number": "2003537995",
  "pertinence": 53,
  "createdAt": "2025-07-11"
}, {
  "id": 16,
  "first_name": "Pace",
  "last_name": "Blogg",
  "email": "pbloggf@biglobe.ne.jp",
  "job": "Administrative Assistant I",
  "phone_number": "7472576326",
  "pertinence": 40,
  "createdAt": "2025-04-19"
}, {
  "id": 17,
  "first_name": "Gray",
  "last_name": "Enderlein",
  "email": "genderleing@alibaba.com",
  "job": "Statistician I",
  "phone_number": "7153531174",
  "pertinence": 24,
  "createdAt": "2025-09-13"
}, {
  "id": 18,
  "first_name": "Isaiah",
  "last_name": "Waitland",
  "email": "iwaitlandh@csmonitor.com",
  "job": "Administrative Officer",
  "phone_number": "9811637683",
  "pertinence": 83,
  "createdAt": "2025-01-18"
}, {
  "id": 19,
  "first_name": "Mirella",
  "last_name": "Bock",
  "email": "mbocki@smh.com.au",
  "job": "Environmental Specialist",
  "phone_number": "9994955851",
  "pertinence": 48,
  "createdAt": "2025-08-31"
}, {
  "id": 20,
  "first_name": "Ely",
  "last_name": "Osbourn",
  "email": "eosbournj@ustream.tv",
  "job": "Nuclear Power Engineer",
  "phone_number": "5546632633",
  "pertinence": 100,
  "createdAt": "2025-09-23"
}, {
  "id": 21,
  "first_name": "Wenona",
  "last_name": "McAndie",
  "email": "wmcandiek@china.com.cn",
  "job": "Chief Design Engineer",
  "phone_number": "9659434450",
  "pertinence": 24,
  "createdAt": "2025-03-06"
}, {
  "id": 22,
  "first_name": "Lyon",
  "last_name": "Birmingham",
  "email": "lbirminghaml@edublogs.org",
  "job": "Quality Engineer",
  "phone_number": "3766819065",
  "pertinence": 64,
  "createdAt": "2025-04-23"
}, {
  "id": 23,
  "first_name": "Ches",
  "last_name": "Luchetti",
  "email": "cluchettim@phoca.cz",
  "job": "Registered Nurse",
  "phone_number": "7721214673",
  "pertinence": 73,
  "createdAt": "2025-05-31"
}, {
  "id": 24,
  "first_name": "Cheslie",
  "last_name": "Bouller",
  "email": "cboullern@amazon.co.uk",
  "job": "Engineer I",
  "phone_number": "2405072094",
  "pertinence": 74,
  "createdAt": "2025-08-24"
}, {
  "id": 25,
  "first_name": "Meg",
  "last_name": "Swanbourne",
  "email": "mswanbourneo@dell.com",
  "job": "Software Engineer II",
  "phone_number": "4054137909",
  "pertinence": 2,
  "createdAt": "2025-09-02"
}]

    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [filteredProspects, setFilteredProspects] = useState(fakeUser.toSorted((a, b) => b.pertinence - a.pertinence));
    const [followedProspects, setFollowedProspects] = useState(fakeUser.slice(0, 5));
    const [selectedProspect, setSelectedProspect] = useState<any>(null);

    // Selection handlers
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxes = document.querySelectorAll('.prospects-table tbody input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
            const selectedProspect = document.getElementById(checkbox.dataset.id as string);
            if(selectedProspect) {
                selectedProspect.classList.toggle('selected');
            }
        });
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedProspect = document.getElementById(e.target.dataset.id as string);
        if(selectedProspect) {
            selectedProspect.classList.toggle('selected');
        }
    }

    // Modal handlers
    const handleOpenModalInfo = (e : React.MouseEvent<HTMLButtonElement>) => {
        console.log("open modal");
        setSelectedProspect( fakeUser.find( (user) => user.id === parseInt(e.currentTarget.dataset.id as string)))
        setModalInfoOpen(true);
    }

    const handleCloseModalInfo = () => {
        setModalInfoOpen(false);
    }


    //Filter handlers
    const handleTypeList = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = document.querySelectorAll(".btn-typebar")
        btn.forEach( button => {
            button.classList.remove("active");
        })

        const activeBtn = e.currentTarget;
        activeBtn.classList.add("active");

        const type = activeBtn.getAttribute("data-value");

        switch(type){
            case "all":
                setFilteredProspects(fakeUser.toSorted((a, b) => b.pertinence - a.pertinence));
                break;
            case "followed":
                setFilteredProspects(followedProspects.toSorted((a, b) => b.pertinence - a.pertinence));
                break;
            default:
                setFilteredProspects(fakeUser.toSorted((a, b) => b.pertinence - a.pertinence));
        }

    }

    const handleApplyFilters = () => {
        var filteredProspectsTemp = fakeUser;
        const pertinenceFilter = (document.getElementById('pertinence') as HTMLSelectElement).value;
        var dateFromFilter = (document.getElementById('date_from') as HTMLInputElement).value;
        var dateToFilter = (document.getElementById('date_to') as HTMLInputElement).value;

        dateFromFilter = dateFromFilter.length > 0 ? dateFromFilter : '0000-01-01';
        dateToFilter = dateToFilter.length > 0 ? dateToFilter : '9999-12-31';

        let pertinenceValue = {min: 0, max: 100};
        if(pertinenceFilter !== 'all') {
            if(pertinenceFilter === 'high') pertinenceValue = {min: 75, max: 100};
            else if(pertinenceFilter === 'mid') pertinenceValue = {min: 50, max: 74};
            else if(pertinenceFilter === 'low') pertinenceValue = {min: 0, max: 49};
        }

        const result = filteredProspectsTemp.filter((prospect) => 
            prospect.createdAt >= dateFromFilter && prospect.createdAt <= dateToFilter
            && prospect.pertinence >= pertinenceValue.min && prospect.pertinence <= pertinenceValue.max
        )

        setFilteredProspects(result);
        setModalFilterOpen(false);
    }

    const handleSearchbar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const result = fakeUser.filter((prospect) => 
            (prospect.first_name + " " + prospect.last_name).toLowerCase().includes(searchTerm)
        );
        setFilteredProspects(result);
    }

    const handleResetFilters = () => {
        (document.getElementById('pertinence') as HTMLSelectElement).value = "all";
        (document.getElementById('date_from') as HTMLInputElement).value = "";
        (document.getElementById('date_to') as HTMLInputElement).value = "";

        setFilteredProspects(fakeUser.toSorted((a, b) => b.pertinence - a.pertinence));
        setModalFilterOpen(false);
    }

    // Followed handlers
    const handleToggleFollowed = (e : React.MouseEvent<HTMLButtonElement>) => {
        const prospectId = e.currentTarget.dataset.id;
        if(!prospectId) return;

        const prospect = fakeUser.find( (user) => user.id === parseInt(prospectId) );
        if(!prospect) return;

        const isFollowed = followedProspects.find( (user) => user.id === parseInt(prospectId) );
        
        if(isFollowed) {
            // Remove from followed
            const newFollowed = followedProspects.filter( (user) => user.id !== parseInt(prospectId) );
            setFollowedProspects(newFollowed);
        } else {
            // Add to followed
            setFollowedProspects([...followedProspects, prospect]);
        }
    }

    // Rendering prospects
    const dateOptions : Intl.DateTimeFormatOptions = {day:"numeric", month: "numeric", year : "numeric"}

    const fakeUserRender = filteredProspects.map( (user) => {
        return(
            <tr key={user.id} id={`prospect-${user.id}`}>
                <td>
                    <input type="checkbox" data-id={`prospect-${user.id}`} onChange={handleSelect} />
                </td>
                <td>
                    {user.first_name} {user.last_name}
                </td>
                <td>
                    <CircularProgressBar value={user.pertinence} />
                </td>
                <td>
                    {convertDate(user.createdAt, dateOptions)}
                </td>
                <td className="table-actions">
                    <button data-id={user.id} onClick={handleOpenModalInfo}><FontAwesomeIcon icon={faInfo} /></button>
                    <button data-id={user.id} onClick={handleToggleFollowed}><FontAwesomeIcon icon={followedProspects.find( (followedUser) => followedUser.id === user.id ) ? faEyeSlash : faEye} /></button>
                    <button><FontAwesomeIcon icon={faPaperPlane} /></button>
                </td>
            </tr>
        )
    })

    return(
        <div className="dashboard-home">
            <h1>Prospects</h1>
            <div className="dashboard-metrics">
                <Metric label="Prospects total" value={fakeUser.length} trend="up" icon={faUser} />
                <Metric label="Nouveau prospects" value={5} trend="down" icon={faUserPlus} />
                <Metric label="Prospects pertinents" value={fakeUser.filter( (user) => user.pertinence >= 75 ).length} icon={faUserCheck} />
                <Metric label="Prospects suivis" value={followedProspects.length} icon={faUserTag}/>
            </div>

            <div className="prospects-list-header">
                <div className="header-left">
                    <div className="prospects-typebar">
                        <button className="btn-typebar active" data-value="all" onClick={handleTypeList}>Tous</button>
                        <button className="btn-typebar" data-value="followed" onClick={handleTypeList}>Suivis</button>
                    </div>
                </div>
                <div className="header-right">
                    <div className="prospects-searchbar">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input onChange={handleSearchbar} type="text" placeholder="Rechercher un prospect..." />
                        <button onClick={() => setModalFilterOpen(true)}><FontAwesomeIcon icon={faSliders} /></button>
                    </div>
                </div>
            </div>

            <div className="prospects-list">
                
                <table className="prospects-table">
                    <thead>
                        <th>
                            <input type="checkbox" onChange={handleSelectAll} />
                        </th>
                        <th className="main-td">
                            Nom
                        </th>
                        <th>
                            Pertinence
                        </th>
                        <th>
                            Inscrit
                        </th>
                        <th style={{width: 0}}>
                            Actions
                        </th>
                    </thead>
                    <tbody>
                        {fakeUserRender}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalInfoOpen} onClose={handleCloseModalInfo}>
                <h2>Informations du prospect</h2>
                <div className="info-grid">
                    <div className="info-grid-item">
                        <p>Nom :</p>
                        <p>{selectedProspect ? selectedProspect.first_name + " " + selectedProspect.last_name :"John Doe"}</p>
                    </div>
                    <div className="info-grid-item">
                        <p>E-mail :</p>
                        <p>{selectedProspect ? selectedProspect.email : 'john.doe@example.com'}</p>
                    </div>
                    <div className="info-grid-item">
                        <p>Téléphone :</p>
                        <p>{selectedProspect ? selectedProspect.phone_number : "01 23 45 67 89"}</p>
                    </div>
                    <div className="info-grid-item">
                        <p>Poste :</p>
                        <p>{selectedProspect ? selectedProspect.job : "Chef de projet IT"}</p>
                    </div>
                    <div className="info-grid-item">
                        <p>Pertinence :</p>
                        <p>{selectedProspect ? <CircularProgressBar value={selectedProspect.pertinence} /> : <CircularProgressBar value={0} />}</p>
                    </div>
                    <div className="info-grid-item">
                        <p>Date d'inscription :</p>
                        <p>{selectedProspect ? convertDate(selectedProspect.createdAt, dateOptions) : "19/11/2025"}</p>
                    </div>
                </div>

                <div className="info-actions">
                    <Button data-id={selectedProspect ? selectedProspect.id : null} onClick={handleToggleFollowed}><FontAwesomeIcon icon={followedProspects.find( (followedUser) => selectedProspect && followedUser.id === selectedProspect.id ) ? faEyeSlash : faEye} /> {followedProspects.find( (followedUser) => followedUser.id === selectedProspect?.id ) ? "Ne plus suivre" : "Suivre"}</Button>
                    <Button ><FontAwesomeIcon icon={faPaperPlane} /> Envoyer un message</Button>
                </div>
            </Modal>

            <Modal isOpen={modalFilterOpen} onClose={() => setModalFilterOpen(false)}>
                <h2>Filtres</h2>
                <div className="filter-section">
                    <h3>Pertinence</h3>
                    <Select id="pertinence" label="Niveau de pertinence">
                        <option value="all">Tous</option>
                        <option value="high">Haute</option>
                        <option value="mid">Moyenne</option>
                        <option value="low">Faible</option>
                    </Select>
                </div>
                <div className="filter-section">
                    <h3>Date d'inscription</h3>
                    <div className="side-filter">
                        <Input id="date_from" type="date" label="De" />
                        <Input id="date_to" type="date" label="À" />
                    </div>
                </div>
                <div className="info-actions">
                    <Button onClick={handleResetFilters}><FontAwesomeIcon icon={faRotateLeft} /> Réinitialiser</Button>
                    <Button onClick={handleApplyFilters}><FontAwesomeIcon icon={faCheck} /> Appliquer</Button>
                </div>
            </Modal>
            
        </div>
    )

}