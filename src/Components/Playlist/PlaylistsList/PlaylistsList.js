import React, {useContext} from 'react';
import {PlaylistListItem} from "./PlaylistListItem";
import Loading from "../../Loading/Loading";
import AppContext from "../../../Contexts/AppContext";

function PlaylistsList({onDisplayCustomPlaylist}) {
    const {userPlaylistsContext: {userPlaylists: {playlists, isLoading}}} = useContext(AppContext)

    if (isLoading) {
        return <Loading/>;
    } else {
        return (
            <div className="TrackList">
                {playlists.map(playlist =>
                    <PlaylistListItem
                        playlist={playlist}
                        key={playlist.id}
                        onDisplayCustomPlaylist={onDisplayCustomPlaylist}/>)}
            </div>
        );
    }
}

export default PlaylistsList;