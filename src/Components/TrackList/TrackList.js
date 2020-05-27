import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export function TrackList(props) {
    return (
        <div className="TrackList" id={props.id}>
            {props.tracks.map(track => <Track
                track={track}
                key={track.id}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                isRemoval={props.isRemoval}
                onPlay={props.onPlay}
                onPause={props.onPause}
                isPlaying={props.playingTrack === track.id}/>)}
        </div>
    );
}