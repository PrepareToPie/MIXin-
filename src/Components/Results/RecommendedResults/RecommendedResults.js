import React, {useContext} from 'react';
import {TrackList} from "../../TrackList/TrackList";
import Loading from "../../Loading/Loading";
import AppContext from "../../../Contexts/AppContext";

function RecommendedResults() {
    const {recommendedContext: {recommended}} = useContext(AppContext)

    if (recommended.isLoading) {
        return <Loading/>;
    }
    if (recommended.tracks.length) {
        return (
            <div className="SearchResults">
                <TrackList
                    tracks={recommended.tracks}/>
            </div>
        );
    } else {
        return <div className="SearchResults"><h2>Nothing to recommend :(</h2></div>
    }
}

export default RecommendedResults;