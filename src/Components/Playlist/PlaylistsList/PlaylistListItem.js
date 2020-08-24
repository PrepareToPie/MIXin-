import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export function PlaylistListItem(props) {

    const getTracks = () => {
        props.onPlaylistGet(props.playlist);
        props.onDisplayCustomPlaylist();
    }

    return props.playlist.id ? (
        <div className="list-item playlist-item" onClick={getTracks}>
            <div className="list-item-info">
                <h3>{props.playlist.name}</h3>
            </div>
            {!props.playlist.public &&
                <p className="explicit">PRIVATE</p>
            }
        </div>) : (
            <div className="list-item playlist-item" onClick={getTracks}>
                <FontAwesomeIcon className="plus-icon" icon={faPlusSquare} size="2x" />
                <div className="list-item-info">
                    <h3>{props.playlist.name}</h3>
                </div>
                {!props.playlist.public &&
                    <p className="explicit">PRIVATE</p>
                }
            </div>
        )
}