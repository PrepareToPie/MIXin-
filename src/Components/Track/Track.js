import React from 'react';
import './Track.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Audio} from '@bit/mhnpd.react-loader-spinner.audio';
import {faPause, faPlay, faPlus, faMinus, faVolumeMute} from '@fortawesome/free-solid-svg-icons';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    playTrack() {
        this.props.onPlay(this.props.track);
    }

    pauseTrack() {
        this.props.onPause(this.props.track);
    }

    renderAction() {
        return this.props.isRemoval ?
            <FontAwesomeIcon icon={faMinus} className="Track-action" onClick={this.removeTrack}/> :
            <FontAwesomeIcon icon={faPlus} className="Track-action" onClick={this.addTrack}/>;
    }

    renderPlay() {
        if(this.props.track.isPlayable) {
            return this.props.isPlaying ?
                <FontAwesomeIcon onClick={this.pauseTrack} icon={faPause} className="Track-action"/>
                :
                <FontAwesomeIcon onClick={this.playTrack} icon={faPlay} className="Track-action"/>;
        } else {
            return <FontAwesomeIcon icon={faVolumeMute} className="Track-action Inactive"/>;
        }
    }

    render() {
        return (
            <div className="Track">
                {this.renderPlay()}
                <div className="Track-information">
                    <h3><a href={this.props.track.external_url} target="_blank" rel="noopener noreferrer"> {this.props.track.name} </a></h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.props.track.explicit && !this.props.isPlaying &&
                    <p className="Explicit">EXPLICIT</p>
                }
                {this.props.isPlaying &&
                <Audio
                    color={'rgba(108, 65, 233, .7)'}
                    height={35}
                    width={35}
                />}
                {this.renderAction()}
            </div>
        );
    }
} 