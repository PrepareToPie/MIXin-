import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';
import Loading from "../Loading/Loading";

export function SearchResults(props) {
    if (props.searchResults.loading) {
        return <Loading />;
    } else if (props.searchResults.tracks.length) {
        return (
            <div className="SearchResults">
                <TrackList
                    tracks={props.searchResults.tracks}
                    onAdd={props.onAdd}
                    onPlay={props.onPlay}
                    onPause={props.onPause}
                    onLoading={props.onLoading}
                    isRemoval={false}
                    playingTrack={props.playingTrack} />
            </div>
        );
    } else {
        return <div className="SearchResults"><h2>...</h2></div>
    }
}