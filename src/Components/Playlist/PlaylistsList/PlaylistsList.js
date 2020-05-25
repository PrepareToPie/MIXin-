import React, {Component} from 'react';
import {PlaylistListItem} from "./PlaylistListItem";

class PlaylistsList extends Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.playlists.map(playlist =>
                    <PlaylistListItem
                        playlist={playlist}
                        key={playlist.id}
                        onPlaylistGet={this.props.onPlaylistGet}
                        onDisplayCustomPlaylist={this.props.onDisplayCustomPlaylist}/>)}
            </div>
        );
    }
}

export default PlaylistsList;