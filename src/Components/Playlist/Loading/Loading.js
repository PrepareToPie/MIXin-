import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Loading() {
    return (
        <div className="playlist-window">
            <FontAwesomeIcon icon={faSpinner} spin pulse size="5x" className="saving"/>
            <p>Saving your playlist to <span id="Spotify">Spotify</span></p>
        </div>
    );
}

export default Loading;