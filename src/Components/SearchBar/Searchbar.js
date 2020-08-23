import React, {useContext} from 'react';
import './SearchBar.css';
import AppContext from "../../Contexts/AppContext";

export function SearchBar() {

    const {SearchContext: {search}} = useContext(AppContext)

    const handleTermChange = (event) => {
        search(event.target.value);
    }

    return (
        <div className="SearchBar">
            <input placeholder="Track, artist or album" onChange={handleTermChange}/>
        </div>
    );
}