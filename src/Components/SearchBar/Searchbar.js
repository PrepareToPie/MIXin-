import React from 'react';
import './SearchBar.css';

export function SearchBar(props) {

    const search = (term) => {
        props.onSearch(term);
    }

    const handleTermChange = (event) => {
        search(event.target.value);
    }

    return (
        <div className="SearchBar">
            <input placeholder="Track, artist or album" onChange={handleTermChange} />
        </div>
    );
}