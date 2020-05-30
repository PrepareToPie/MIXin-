import React from 'react';
import {PlaylistAction} from "./PlaylistAction/PlaylistAction";
import {TrackList} from "../TrackList/TrackList";
import PlaylistDetails from "./PlaylistDetails";
import Loading from "../Loading/Loading";

function Playlist(props) {
    if (props.playlist.loading) {
        return <Loading/>;
    } else {
        return (
            <div className="playlist">
                <PlaylistDetails
                    playlistName={props.playlist.name}
                    onNameChange={props.onNameChange}
                    onTogglePublic={props.onTogglePublic}
                    isPublic={props.playlist.public}/>
                {!!props.playlist.tracks.length &&
                <PlaylistAction
                    isPublic={props.playlist.public}
                    onSave={props.onSave}
                    onClear={props.onClear}
                />}
                {!!props.playlist.tracks.length ?
                    <TrackList id="TrackList-right"
                               tracks={props.playlist.tracks}
                               onRemove={props.onRemove}
                               isRemoval={true}
                               onPlay={props.onPlay}
                               onPause={props.onPause}
                               playingTrack={props.playingTrack}/>
                    : <h2>Time to add some tracks! </h2>}
            </div>
        );

    }
}

export default Playlist;