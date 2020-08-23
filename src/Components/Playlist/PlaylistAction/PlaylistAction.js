import React from 'react';

export function PlaylistAction({onSave, onClear}) {
    return <div className="playlist-action">
        <button id="playlist-save" onClick={onSave}>Save to Spotify</button>
        <button id="playlist-clear" onClick={onClear}>Clear playlist</button>
    </div>;
}