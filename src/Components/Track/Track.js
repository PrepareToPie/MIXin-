import React from 'react';
import './Track.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Audio } from '@bit/mhnpd.react-loader-spinner.audio';
import { faMinus, faPause, faPlay, faPlus, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

export function Track(props) {

    const addTrack = () => {
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        props.onRemove(props.track);
    }

    const playTrack = () => {
        props.onPlay(props.track);
    }

    const pauseTrack = () => {
        props.onPause(props.track);
    }

    const renderAction = () => {
        return props.isRemoval ?
            <FontAwesomeIcon icon={faMinus} className="track-action" onClick={removeTrack} /> :
            <FontAwesomeIcon icon={faPlus} className="track-action" onClick={addTrack} />;
    }

    const renderPlay = () => {
        if (props.track.isPlayable) {
            return props.isPlaying ?
                <FontAwesomeIcon onClick={pauseTrack} icon={faPause} className="track-action" />
                :
                <FontAwesomeIcon onClick={playTrack} icon={faPlay} className="track-action" />;
        } else {
            return <FontAwesomeIcon icon={faVolumeMute} className="track-action inactive" />;
        }
    }

    return (
        <div className="list-item">
            {renderPlay()}
            <div className="list-item-info">
                <h3><a href={props.track.external_url} target="_blank"
                    rel="noopener noreferrer"> {props.track.name} </a></h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {props.track.explicit && !props.isPlaying &&
                <p className="explicit">EXPLICIT</p>
            }
            {props.isPlaying &&
                <Audio
                    color={'rgba(108, 65, 233, .7)'}
                    height={35}
                    width={35}
                />}
            {renderAction()}
        </div>
    );
} 