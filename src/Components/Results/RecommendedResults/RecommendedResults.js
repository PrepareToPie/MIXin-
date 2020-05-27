import React from 'react';
import {TrackList} from "../../TrackList/TrackList";
import Loading from "../../Playlist/Loading/Loading";

function RecommendedResults(props) {
    if (props.recommended.tracks.length) {
        return (
            <div className="SearchResults">
                <TrackList
                    tracks={props.recommended.tracks}
                    onAdd={props.onAdd}
                    onPlay={props.onPlay}
                    onPause={props.onPause}
                    isRemoval={false}
                    playingTrack={props.playingTrack}/>
            </div>
        );
    } else if (props.recommended.loading) {
        return <Loading/>;
    } else {
        return <div className="SearchResults"><h2>At first let's add some tracks to playlist ;)</h2></div>
    }
}

export default RecommendedResults;