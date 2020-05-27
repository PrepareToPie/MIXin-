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
            displayedPlaylist: "users"
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
        if (this.props.playlist.saving) {
            return (
                <Loading>
                    <p>Saving your playlist to <span id="spotify">Spotify</span></p>
                </Loading>
            );
        } else {
            switch (this.state.displayedPlaylist) {
                case "users":
                    return (
                        <div className="playlist-window">
                            <PlaylistWindowHeader
                                playlistName={this.props.playlist.name}
                                displayedPlaylist={this.state.displayedPlaylist}
                                onDisplayCustomPlaylist={this.displayCustomPlaylist}
                                onDisplayUsersPLaylists={this.displayUsersPlaylists}/>
                            <PlaylistsList
                                playlists={this.props.userPlaylists.playlists}
                                isLoading={this.props.userPlaylists.loading}
                                onRemove={this.props.onRemove}
                                isRemoval={true}
                                onPlaylistGet={this.props.onPlaylistGet}
                                onDisplayCustomPlaylist={this.displayCustomPlaylist}/>
                        </div>
                    );
                default:
                    return (
                        <div className="playlist-window">
                            <PlaylistWindowHeader
                                playlistName={this.props.playlist.name}
                                displayedPlaylist={this.state.displayedPlaylist}
                                onDisplayCustomPlaylist={this.displayCustomPlaylist}
                                onDisplayUsersPLaylists={this.displayUsersPlaylists}/>
                            <Playlist
                                playlist={this.props.playlist}
                                userPlaylists={this.props.userPlaylists}
                                onRemove={this.props.onRemove}
                                onNameChange={this.props.onNameChange}
                                onSave={this.props.onSave}
                                onClear={this.props.onClear}
                                onTogglePublic={this.props.onTogglePublic}
                                onPlay={this.props.onPlay}
                                onPause={this.props.onPause}
                                playingTrack={this.props.playingTrack}/>
                        </div>
                    );

            }
        }
    }
}

PlaylistWindow.propTypes = {
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}