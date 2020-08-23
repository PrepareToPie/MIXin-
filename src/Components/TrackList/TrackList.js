import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export function TrackList({tracks, id}) {
    return (
        <div className="TrackList" id={id}>
            {tracks.map(track => <Track
                track={track}
                key={track.id}/>)}
        </div>
    );
}