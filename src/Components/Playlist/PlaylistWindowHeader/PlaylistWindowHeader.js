import React, {Component} from "react";
import PlaylistWindowHeaderItem from "./PlaylistWindowHeaderItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

class PlaylistWindowHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isJumpy: false
        }
        this.handleCustomClick = this.handleCustomClick.bind(this);
        this.handleUsersClick = this.handleUsersClick.bind(this);
        this.handleNewClick = this.handleNewClick.bind(this);
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

    handleNewClick() {
        this.setState({isJumpy: !this.state.isJumpy});
        setTimeout(() => {
            this.setState({isJumpy: !this.state.isJumpy});
        }, 500);
        this.props.onNewPlaylist();
        this.props.onDisplayCustomPlaylist();
    }

    render() {
        return (
            <ul className="Results-select">
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "users"}
                                          onClick={this.handleUsersClick}
                                          title="Your playlists"/>
                <PlaylistWindowHeaderItem active={this.props.displayedPlaylist === "custom"}
                                          onClick={this.handleCustomClick}
                                          title="Current playlist"/>
                <FontAwesomeIcon className="add-playlist" size="2x" icon={faPlus} onClick={this.handleNewClick}/>
            </ul>
        );
    }
}

export default PlaylistWindowHeader;