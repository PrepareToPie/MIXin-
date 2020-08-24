import React from 'react';
import { TrackList } from "../../TrackList/TrackList";
import Loading from "../../Loading/Loading";

function RecommendedResults(props) {
    if (props.recommended.loading) {
        return <Loading />;
    }
    if (props.recommended.tracks.length) {
        return (
            <div className="SearchResults">
                <TrackList
                    tracks={props.recommended.tracks}
                    onAdd={props.onAdd}
                    onPlay={props.onPlay}
                    onPause={props.onPause}
                    isRemoval={false}
                    playingTrack={props.playingTrack} />
            </div>
        );
    } else {
        return <div className="SearchResults"><h2>Nothing to recommend :(</h2></div>
    }
}

export default RecommendedResults;