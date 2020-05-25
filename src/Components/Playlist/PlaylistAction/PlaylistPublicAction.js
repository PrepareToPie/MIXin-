import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function PlaylistPublicAction(props) {
    return props.isPublic ?
        <div className="playlist-public-toggle" onClick={props.onTogglePublic}>
            <FontAwesomeIcon size="2x" icon={faUnlock}/>
        </div> :
        <div className="playlist-public-toggle" onClick={props.onTogglePublic}>
            <FontAwesomeIcon size="2x" icon={faLock}/>
        </div>
}