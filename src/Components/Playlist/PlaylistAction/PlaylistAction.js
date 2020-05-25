import React from 'react';

export function PlaylistAction(props) {
    return <div className="playlist-action">
        <button id="playlist-save" onClick={props.onSave}>Save to Spotify</button>
        <button id="playlist-clear" onClick={props.onClear}>Clear playlist</button>
    </div>;
}