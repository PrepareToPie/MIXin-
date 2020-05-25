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
            <div className="Playlist">
                <input placeholder="Playlist name" value={this.props.playlist.name} onChange={this.handleNameChange}/>
                {!!this.props.playlist.tracks.length &&
                <PlaylistAction
                    isPublic={this.props.playlist.public}
                    onSave={this.props.onSave}
                    onClear={this.props.onClear}
                    onTogglePublic={this.props.onTogglePublic}
                />}
                <TrackList id="TrackList-right"
                           tracks={this.props.playlist.tracks}
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