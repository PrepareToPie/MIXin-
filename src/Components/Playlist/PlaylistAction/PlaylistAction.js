import React from 'react';

export function PlaylistAction(props) {
        return <div className="Playlist-action">
            <button id="Playlist-save" onClick={props.onSave}>Save to Spotify</button>
            <button id="Playlist-clear" onClick={props.onClear}>Clear playlist</button>
        </div>;
}