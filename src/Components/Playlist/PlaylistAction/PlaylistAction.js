import React from 'react';
import {PlaylistPublicAction} from "./PlaylistPublicAction";

export function PlaylistAction(props) {
    return <div className="Playlist-action">
        <button id="Playlist-save" onClick={props.onSave}>Save to Spotify</button>
        <button id="Playlist-clear" onClick={props.onClear}>Clear playlist</button>
        <PlaylistPublicAction isPublic={props.isPublic}
                              onTogglePublic={props.onTogglePublic}/>
    </div>;
}