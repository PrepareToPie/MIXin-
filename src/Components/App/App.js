import React from 'react';
import './App.css';
import {PlaylistWindow} from '../Playlist/PlaylistWindow';
import {SearchBar} from '../SearchBar/Searchbar';
import Spotify from '../../util/Spotify';
import Results from "../Results/Results";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            recommendedTracks: [],
            userPlaylists: [],
            playlist: {
                id: '',
                href: '',
                name: 'New Playlist',
                public: true,
                tracks: []
            },
            playlistSaving: false,
            currentlyPlayingTrack: ''
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.pauseAll = this.pauseAll.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.togglePublic = this.togglePublic.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.clearPlaylist = this.clearPlaylist.bind(this);
        this.search = this.search.bind(this);
        this.getUserPlaylists = this.getUserPlaylists.bind(this);
        this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this);
    }

    search(term) {
        this.pauseTrack();
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = this.state.playlist.tracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            this.setState({searchResults: searchResultsToSet});
        });
    }

    getRecommendations() {
        this.state.recommendedTracks.forEach(track => track.audio.pause());
        let seed = this.state.playlist.tracks.map(track => track.id).slice(0, 5).toString();
        Spotify.getRecommendations(seed).then(recommendations => {
            this.setState({recommendedTracks: recommendations});
        });
    }

    addTrack(track) {
        if (!this.state.playlist.tracks.find(savedTrack => savedTrack.id === track.id)) {
            let updatedPlaylistTracks = this.state.playlist.tracks;
            updatedPlaylistTracks.unshift(track);
            let updatedSearchResults = this.state.searchResults;
            updatedSearchResults.splice(this.state.searchResults.indexOf(track), 1);
            let updatedRecommendedTracks = this.state.recommendedTracks;
            updatedRecommendedTracks.splice(this.state.recommendedTracks.indexOf(track), 1);
            this.setState({
                searchResults: updatedSearchResults,
                recommendedTracks: updatedRecommendedTracks
            });
        }
    }

    removeTrack(track) {
        if (this.state.playlist.tracks.find(savedTrack => savedTrack.id === track.id)) {
            if (this.state.currentlyPlayingTrack === track.id) {
                this.pauseTrack(track);
            }
            let updatedPlaylistTracks = this.state.playlist.tracks;
            updatedPlaylistTracks.splice(this.state.playlist.tracks.indexOf(track), 1);
            this.setState({});
        }
    }

    playTrack(track) {
        if (this.state.currentlyPlayingTrack) {
            this.pauseAll();
        }
        track.audio.play();
        this.setState({currentlyPlayingTrack: track.id});
    }

    pauseTrack(track) {
        if (this.state.currentlyPlayingTrack) {
            if (track) {
                track.audio.pause();
                this.setState({currentlyPlayingTrack: ''});
            } else {
                let playingTrack = this.state.playlist.tracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) ||
                    this.state.searchResults.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id ||
                        this.state.recommendedTracks.find(recommendedTrack => this.state.currentlyPlayingTrack === recommendedTrack.id));
                if (playingTrack) {
                    playingTrack.audio.pause();
                }
                this.setState({currentlyPlayingTrack: ''});
            }
        } else {
            this.pauseAll();
        }
    }

    pauseAll() {
        this.state.playlist.tracks.forEach(track => track.audio.pause());
        this.state.searchResults.forEach(track => track.audio.pause());
        this.state.recommendedTracks.forEach(track => track.audio.pause());
    }

    updatePlaylistName(name) {
        let playlist = this.state.playlist;
        playlist.name = name;
        this.setState({playlist: playlist});
    }

    togglePublic() {
        let playlist = this.state.playlist;
        playlist.public = !playlist.public;
        this.setState({playlist: playlist});
    }

    savePlaylist() {
        this.pauseTrack();
        if (this.state.playlist.tracks.length && this.state.playlist.name) {
            this.setState({playlistSaving: true});
            if (!this.state.playlist.id) {
                const trackURIs = this.state.playlist.tracks.map(track => track.uri);
                Spotify.savePlaylist(this.state.playlist.name, trackURIs)
                    .then(() => {
                            let freshPlaylist = {
                                id: '',
                                href: '',
                                name: 'New Playlist',
                                public: true,
                                tracks: []
                            };
                            this.setState({
                                playlist: freshPlaylist,
                                playlistSaving: false
                            });
                        }
                    );
            } else {
                let playlistDetails = {
                    name: this.state.playlist.name,
                    public: this.state.playlist.public
                };
                Spotify.changePlaylistDetails(this.state.playlist.id, playlistDetails);
                let trackURIs = this.state.playlist.tracks.map(track => track.uri);
                Spotify.replacePlaylistTracks(this.state.playlist.id, trackURIs).then(() => {
                    this.setState({playlistSaving: false});
                });
            }
        }
    }

    getUserPlaylists() {
        Spotify.getPlaylists().then(userPlaylists => {
            let newPlaylist = {
                id: '',
                href: '',
                name: 'New Playlist',
                public: true,
                tracks: []
            };
            userPlaylists.unshift(newPlaylist);
            this.setState({userPlaylists: userPlaylists});
        });
    }

    getPlaylistTracks(playlist) {
        this.pauseTrack();
        Spotify.getPlaylistTracks(playlist.id).then(tracks => {
            playlist.tracks = tracks;
            this.setState({playlist: playlist});
        });
    }

    clearPlaylist() {
        this.state.playlist.tracks.forEach(track => track.audio.pause());
        let updatedPlaylist = this.state.playlist;
        updatedPlaylist.tracks = [];
        this.setState({playlist: updatedPlaylist});
    }

    componentWillMount() {
        Spotify.getAccessToken();
    }

    render() {
        return (
            <div className="App-container">
                <h1>ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <Results
                            searchResults={this.state.searchResults}
                            recommendedTracks={this.state.recommendedTracks}
                            onAdd={this.addTrack}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            onPauseAll={this.pauseAll}
                            onRecommend={this.getRecommendations}
                            playingTrack={this.state.currentlyPlayingTrack}/>
                        <PlaylistWindow
                            playlist={this.state.playlist}
                            userPlaylists={this.state.userPlaylists}
                            onUsersPlaylists={this.getUserPlaylists}
                            onPlaylistGet={this.getPlaylistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onTogglePublic={this.togglePublic}
                            onSave={this.savePlaylist}
                            onClear={this.clearPlaylist}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            playlistSaving={this.state.playlistSaving}
                            playingTrack={this.state.currentlyPlayingTrack}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
