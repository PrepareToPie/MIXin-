import React, {useContext} from 'react';
import './SearchResults.css';
import {TrackList} from '../../TrackList/TrackList';
import Loading from "../../Loading/Loading";
import AppContext from "../../../Contexts/AppContext";

export function SearchResults() {
    const {searchContext: {searchResults}} = useContext(AppContext)
    if (searchResults.isLoading) {
        return <Loading/>;
    } else if (searchResults.tracks.length) {
        return (
            <div className="SearchResults">
                <TrackList
                    tracks={searchResults.tracks}/>
            </div>
        );
    } else {
        return <div className="SearchResults"><h2>...</h2></div>
    }
}