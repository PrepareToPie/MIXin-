import React, {Component} from 'react';
import {PlaylistAction} from "./PlaylistAction/PlaylistAction";
import {TrackList} from "../TrackList/TrackList";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div>
                {!!this.props.playlistTracks.length &&
                <PlaylistAction
                    onSave={this.props.onSave}
                    onClear={this.props.onClear}
                    onNameChange={this.handleNameChange}/>}
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

export default Playlist;