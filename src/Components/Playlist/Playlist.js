import React from 'react';
import {PlaylistAction} from "./PlaylistAction/PlaylistAction";
import {TrackList} from "../TrackList/TrackList";
import PlaylistDetails from "./PlaylistDetails";

function Playlist(props) {
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
            <TrackList id="TrackList-right"
                       tracks={props.playlist.tracks}
                       onRemove={props.onRemove}
                       isRemoval={true}
                       onPlay={props.onPlay}
                       onPause={props.onPause}
                       playingTrack={props.playingTrack}/>
            </div>
        );
}

export default Playlist;