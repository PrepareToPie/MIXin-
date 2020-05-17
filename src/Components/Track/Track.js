import React from 'react';
import './Track.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';

export class Track extends React.Component {
    renderAction() {
        return this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}>-</button> :
            <button className="Track-action" onClick={this.addTrack}>+</button>;
    }

    renderPlay() {
        return this.state.isPlayed ?
            <FontAwesomeIcon onClick={this.pauseTrack} icon={faPause} className="Track-action"/> :
            <FontAwesomeIcon onClick={this.playTrack} icon={faPlay} className="Track-action"/>;
    }

    constructor(props) {
        super(props);
        this.state = {
            isPlayed: false,
            url: this.props.track.preview_url
        };
        this.audio = new Audio(this.state.url);
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
        this.setState({isPlayed: true});
        this.audio.play();
    }

    pauseTrack() {
        this.setState({isPlayed: false});
        this.audio.pause();
    }

    render() {
        return (
            <div className="Track">
                {this.renderPlay()}
                <div className="Track-information">
                    <h3> {this.props.track.name} </h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
} 