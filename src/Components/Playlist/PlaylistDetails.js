import React, {useContext} from 'react';
import {PlaylistPublicAction} from "./PlaylistAction/PlaylistPublicAction";
import AppContext from "../../Contexts/AppContext";

function PlaylistDetails({playlistName, onTogglePublic, isPublic, changePlaylistName}) {

    return (
        <div className="playlist-details">
            <input placeholder="Playlist name" value={playlistName}
                   onChange={(event) => {
                       changePlaylistName(event.target.value)
                   }}/>
            <PlaylistPublicAction onTogglePublic={onTogglePublic}
                                  isPublic={isPublic}/>
        </div>
    );
}

export default PlaylistDetails;