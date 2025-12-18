'use client'

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

interface SearchbarProps
{
    onSearch: (search: string) => void
}

export default function SearchbarComponent({onSearch}: SearchbarProps)
{
    const [searchbarValue, setValue] = useState("")

    function handleClick()
    {
        onSearch(searchbarValue)
    }

    return(
        <div className="searchbar-container">
            <input onChange={e => setValue(e.target.value)} className="searchbar-input text-(--color-blue)" type="text" placeholder="Rechercher un article" />
            <button className="searchbar-button" onClick={handleClick}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
}