import React, {Component} from "react";
import PlaylistWindowHeaderItem from "./PlaylistWindowHeaderItem";

class PlaylistWindowHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isJumpy: false
        }
        this.handleCustomClick = this.handleCustomClick.bind(this);
        this.handleUsersClick = this.handleUsersClick.bind(this);
    }

    handleCustomClick() {
        this.setState({isJumpy: !this.state.isJumpy});
        setTimeout(() => {
            this.setState({isJumpy: !this.state.isJumpy});
        }, 500);
        this.props.onDisplayCustomPlaylist();
    }

    handleUsersClick() {
        this.setState({isJumpy: !this.state.isJumpy});
        setTimeout(() => {
            this.setState({isJumpy: !this.state.isJumpy});
        }, 500);
        this.props.onDisplayUsersPLaylists();
    }

    render() {
        return (
            <ul className="Results-select">
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "custom"}
                                          onClick={this.handleCustomClick}
                                          title={this.props.playlistName}/>
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "users"}
                                          onClick={this.handleUsersClick}
                                          title="Your playlists"/>
            </ul>
        );
    }
}

export default PlaylistWindowHeader;