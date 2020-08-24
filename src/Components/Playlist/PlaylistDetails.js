import React, { Component } from 'react';
import { PlaylistPublicAction } from "./PlaylistAction/PlaylistPublicAction";

function PlaylistDetails(props) {

    const handleNameChange = (event) => {
        props.onNameChange(event.target.value);
    }

    return (
        <div className="playlist-details">
            <input placeholder="Playlist name" value={props.playlistName}
                onChange={handleNameChange} />
            <PlaylistPublicAction onTogglePublic={props.onTogglePublic}
                isPublic={props.isPublic} />
        </div>
    );
}

export default PlaylistDetails;