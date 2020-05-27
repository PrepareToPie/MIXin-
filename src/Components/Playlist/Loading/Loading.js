import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import './Loading.css';
import React from "react";

function Loading(props) {
    return (
        <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin pulse size="5x" className="saving"/>
            {props.children}
        </div>
    );
}

export default Loading;