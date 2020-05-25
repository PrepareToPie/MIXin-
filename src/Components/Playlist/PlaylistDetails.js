import React, {Component} from 'react';
import {PlaylistPublicAction} from "./PlaylistAction/PlaylistPublicAction";

class PlaylistDetails extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="playlist-details">
                <input placeholder="Playlist name" value={this.props.playlistName}
                       onChange={this.handleNameChange}/>
                <PlaylistPublicAction onTogglePublic={this.props.onTogglePublic}
                                      isPublic={this.props.isPublic}/>
            </div>
        );
    }
}

export default PlaylistDetails;