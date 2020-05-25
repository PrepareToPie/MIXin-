import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function PlaylistPublicAction(props) {
    return props.isPublic ?
        <div className="Playlist-public" onClick={props.onTogglePublic}>
            <FontAwesomeIcon size="2x" icon={faUnlock}/>
            <p>public</p>
        </div> :
        <div className="Playlist-public" onClick={props.onTogglePublic}>
            <FontAwesomeIcon size="2x" icon={faLock}/>
            <p>private</p>
        </div>
}