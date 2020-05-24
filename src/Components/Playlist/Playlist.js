import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';
import {PlaylistAction} from './PlaylistAction/PlaylistAction';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        if (this.props.playlistSaving) {
            return (
                <div className="Playlist">
                    <FontAwesomeIcon icon={faSpinner} spin pulse size="5x" className="Saving"/>
                    <p>Saving your playlist to <span id="Spotify">Spotify</span></p>
                </div>
            );
        } else {
            return (
                <div className="Playlist">
                    <input placeholder="Playlist name" onChange={this.handleNameChange}/>
                    {!!this.props.playlistTracks.length && <PlaylistAction
                        onSave={this.props.onSave}
                        onClear={this.props.onClear}/>}
                    <TrackList tracks={this.props.playlistTracks}
                               onRemove={this.props.onRemove}
                               isRemoval={true}
                               onPlay={this.props.onPlay}
                               onPause={this.props.onPause}
                               playingTrack={this.props.playingTrack}/>
                </div>
            );
        }
    }
}

Playlist.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}