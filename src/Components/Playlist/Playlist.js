import React, {useContext} from 'react';
import {PlaylistAction} from "./PlaylistAction/PlaylistAction";
import {TrackList} from "../TrackList/TrackList";
import PlaylistDetails from "./PlaylistDetails";
import Loading from "../Loading/Loading";
import AppContext from "../../Contexts/AppContext";

function Playlist({playlist}) {
    const {playlistContext: {changePlaylistName, togglePublic, savePlaylist, clearPlaylist}} = useContext(AppContext)
    if (playlist.isLoading) {
        return <Loading/>;
    } else {
        return (
            <div className="playlist">
                <PlaylistDetails
                    playlistName={playlist.name}
                    changePlaylistName={changePlaylistName}
                    onTogglePublic={togglePublic}
                    isPublic={playlist.public}/>
                {!!playlist.tracks.length &&
                <PlaylistAction
                    onSave={savePlaylist}
                    onClear={clearPlaylist}
                />}
                {!!playlist.tracks.length ?
                    <TrackList id="TrackList-right"
                               tracks={playlist.tracks}/>
                    : <h2>Time to add some tracks! </h2>}
            </div>
        );

    }
}

export default Playlist;