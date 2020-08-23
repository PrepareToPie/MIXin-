import React, {useContext} from 'react';
import './Track.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Audio} from '@bit/mhnpd.react-loader-spinner.audio';
import {faMinus, faPause, faPlay, faPlus, faVolumeMute} from '@fortawesome/free-solid-svg-icons';
import AppContext from "../../Contexts/AppContext";
import PlayerContext from "../../Contexts/PlayerContext";

export function Track({track, isRemoval}) {
    const {playlistContext: {addTrack, removeTrack}} = useContext(AppContext)
    const {playingTrack, playTrack, pauseTrack} = useContext(PlayerContext)
    const isPlaying = playingTrack.id === track.id

    const renderAction = () => (isRemoval ?
        <FontAwesomeIcon icon={faMinus} className="track-action" onClick={() => removeTrack(track)}/> :
        <FontAwesomeIcon icon={faPlus} className="track-action" onClick={() => addTrack(track)}/>)

    const renderPlay = () => {
        if (track.isPlayable) {
            return isPlaying ?
                <FontAwesomeIcon onClick={() => pauseTrack()} icon={faPause} className="track-action"/>
                :
                <FontAwesomeIcon onClick={() => playTrack()} icon={faPlay} className="track-action"/>;
        } else {
            return <FontAwesomeIcon icon={faVolumeMute} className="track-action inactive"/>;
        }
    }

    return (
        <div className="list-item">
            {renderPlay()}
            <div className="list-item-info">
                <h3><a href={track.external_url} target="_blank"
                       rel="noopener noreferrer"> {track.name} </a></h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {track.explicit && !isPlaying &&
            <p className="explicit">EXPLICIT</p>
            }
            {isPlaying &&
            <Audio
                color={'rgba(108, 65, 233, .7)'}
                height={35}
                width={35}
            />}
            {renderAction()}
        </div>
    );
} 