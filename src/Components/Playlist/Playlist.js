import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

Playlist.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}