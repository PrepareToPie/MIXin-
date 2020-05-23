import React from 'react';

export function PlaylistAction(props) {
        return <div className="Playlist-action">
            <button className="Playlist-save" onClick={props.onSave}>Save to Spotify</button>
        </div>;
}