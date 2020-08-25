import React from 'react';
import { PlaylistListItem } from "./PlaylistListItem";
import Loading from "../../Loading/Loading";

function PlaylistsList(props) {
    if (props.isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="TrackList">
                {props.playlists.map(playlist =>
                    <PlaylistListItem
                        playlist={playlist}
                        key={playlist.id}
                        onPlaylistGet={props.onPlaylistGet} />)}
            </div>
        );
    }
}

export default PlaylistsList;