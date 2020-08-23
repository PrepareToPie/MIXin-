import React, {useContext, useState} from 'react';
import './Playlist.css';
import Loading from "../Loading/Loading";
import PlaylistWindowHeader from "./PlaylistWindowHeader/PlaylistWindowHeader";
import PlaylistsList from "./PlaylistsList/PlaylistsList";
import Playlist from "./Playlist";
import AppContext from "../../Contexts/AppContext";

export function PlaylistWindow() {
    const [displayedPlaylist, setDisplayedPlaylist] = useState("users")
    const {userPlaylistsContext: {getUserPlaylists}, playlistContext: {playlist}} = useContext(AppContext)

    const displayCustomPlaylist = () => {
        setDisplayedPlaylist("custom");
    }

    const displayUsersPlaylists = () => {
        getUserPlaylists();
        setDisplayedPlaylist("users");
    }


    if (playlist.isSaving) {
        return (
            <div className="playlist-window">
                <Loading>
                    <p>Saving your playlist to <span id="spotify">Spotify</span></p>
                </Loading>
            </div>
        );
    } else {
        switch (displayedPlaylist) {
            case "users":
                return (
                    <div className="playlist-window">
                        <PlaylistWindowHeader
                            playlistName={playlist.name}
                            displayedPlaylist={displayedPlaylist}
                            onDisplayCustomPlaylist={displayCustomPlaylist}
                            onDisplayUsersPLaylists={displayUsersPlaylists}/>
                        <PlaylistsList
                            onDisplayCustomPlaylist={displayCustomPlaylist}/>
                    </div>
                );
            default:
                return (
                    <div className="playlist-window">
                        <PlaylistWindowHeader
                            playlistName={playlist.name}
                            displayedPlaylist={displayedPlaylist}
                            onDisplayCustomPlaylist={displayCustomPlaylist}
                            onDisplayUsersPLaylists={displayUsersPlaylists}/>
                        <Playlist
                            playlist={playlist}/>
                    </div>
                );

        }
    }
}