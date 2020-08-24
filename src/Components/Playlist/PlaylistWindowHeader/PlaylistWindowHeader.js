import React, { Component } from "react";
import PlaylistWindowHeaderItem from "./PlaylistWindowHeaderItem";

class PlaylistWindowHeader extends Component {
    state = {
        isJumpy: false
    }
    handleCustomClick = () => {
        this.setState({ isJumpy: !this.state.isJumpy });
        setTimeout(() => {
            this.setState({ isJumpy: !this.state.isJumpy });
        }, 500);
        this.props.onDisplayCustomPlaylist();
    }

    handleUsersClick = () => {
        this.setState({ isJumpy: !this.state.isJumpy });
        setTimeout(() => {
            this.setState({ isJumpy: !this.state.isJumpy });
        }, 500);
        this.props.onDisplayUsersPLaylists();
    }

    render() {
        return (
            <ul className="Results-select">
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "users"}
                    onClick={this.handleUsersClick}
                    title="Your playlists" />
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "custom"}
                    onClick={this.handleCustomClick}
                    title="Current playlist" />
            </ul>
        );
    }
}

export default PlaylistWindowHeader;