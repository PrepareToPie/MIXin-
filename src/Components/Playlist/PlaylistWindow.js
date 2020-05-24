import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import Loading from "./Loading/Loading";
import PlaylistWindowHeader from "./PlaylistWindowHeader/PlaylistWindowHeader";
import PlaylistsList from "./PlaylistsList/PlaylistsList";
import Playlist from "./Playlist";

export class PlaylistWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPlaylist: "custom"
        }
        this.displayCustomPlaylist = this.displayCustomPlaylist.bind(this);
        this.displayUsersPlaylists = this.displayUsersPlaylists.bind(this);
    }

    displayCustomPlaylist() {
        this.setState({displayedPlaylist: "custom"});
    }

    displayUsersPlaylists() {
        this.props.onUsersPlaylists();
        this.setState({displayedPlaylist: "users"});
    }


    render() {
        if (this.props.playlistSaving) {
            return (
                <Loading/>
            );
        } else {
            switch (this.state.displayedPlaylist) {
                case "users":
                    return (
                        <div className="Playlist">
                            <PlaylistWindowHeader
                                playlistName={this.props.playlistName}
                                displayedPlaylist={this.state.displayedPlaylist}
                                onDisplayCustomPlaylist={this.displayCustomPlaylist}
                                onDisplayUsersPLaylists={this.displayUsersPlaylists}/>
                            <PlaylistsList
                                playlists={this.props.userPlaylists}
                                onRemove={this.props.onRemove}
                                isRemoval={true}
                                onPlaylistGet={this.props.onPlaylistGet}
                                onPlay={this.props.onPlay}
                                onPause={this.props.onPause}
                                playingTrack={this.props.playingTrack}/>
                        </div>
                    );
                default:
                    return (
                        <div className="Playlist">
                            <PlaylistWindowHeader
                                playlistName={this.props.playlistName}
                                displayedPlaylist={this.state.displayedPlaylist}
                                onDisplayCustomPlaylist={this.displayCustomPlaylist}
                                onDisplayUsersPLaylists={this.displayUsersPlaylists}/>
                            <Playlist
                                playlistName={this.props.playlistName}
                                playlistTracks={this.props.playlistTracks}
                                userPlaylists={this.props.userPlaylists}
                                onRemove={this.props.onRemove}
                                onNameChange={this.props.onNameChange}
                                onSave={this.props.onSave}
                                onClear={this.props.onClear}
                                onPlay={this.props.onPlay}
                                onPause={this.props.onPause}
                                playlistSaving={this.props.playlistSaving}
                                playingTrack={this.props.currentlyPlayingTrack}/>
                        </div>
                    );

            }
        }
    }
}

PlaylistWindow.propTypes = {
    playlistName: PropTypes.string.isRequired,
    playlistTracks: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}