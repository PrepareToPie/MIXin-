import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import AppContext from "../../../Contexts/AppContext";

export function PlaylistListItem({playlist, onDisplayCustomPlaylist}) {
    const {playlistContext: {getPlaylistTracks}} = useContext(AppContext)

    const getTracks = () => {
        getPlaylistTracks(playlist);
        onDisplayCustomPlaylist();
    }

    return playlist.id ? (
        <div className="list-item playlist-item" onClick={getTracks}>
            <div className="list-item-info">
                <h3>{playlist.name}</h3>
            </div>
            {!playlist.public &&
            <p className="explicit">PRIVATE</p>
            }
        </div>
    ) : (
        <div className="list-item playlist-item" onClick={getTracks}>
            <FontAwesomeIcon className="plus-icon" icon={faPlusSquare} size="2x"/>
            <div className="list-item-info">
                <h3>{playlist.name}</h3>
            </div>
            {!playlist.public &&
            <p className="explicit">PRIVATE</p>
            }
        </div>
    )
}