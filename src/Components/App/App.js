import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../Playlist/Playlist.css';
import { SearchBar } from '../SearchBar/Searchbar';
import Spotify from '../../util/Spotify';
import "../Results/Results.css";
import { Window } from '../Window/Window';
import WindowHeader from '../Window/WindowHeader';
import WindowHeaderItem from '../Window/WindowHeaderItem';
import WindowBody from '../Window/WindowBody';
import { SearchResults } from '../SearchResults/SearchResults';
import RecommendedResults from '../Results/RecommendedResults';
import PlaylistsList from '../Playlist/PlaylistsList/PlaylistsList';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
    state = {
        searchResults: {
            tracks: [],
            loading: false
        },
        recommended: {
            tracks: [],
            loading: false
        },
        userPlaylists: {
            playlists: [],
            loading: false
        },
        playlist: {
            id: '',
            href: '',
            name: 'New Playlist',
            public: true,
            tracks: [],
            loading: false,
            saving: false
        },
        currentlyPlayingTrack: ''
    };

    search = (term) => {
        this.pauseTrack();
        this.setState({ searchResults: { loading: true } });
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = this.state.playlist.tracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            this.setState({ searchResults: { tracks: searchResultsToSet, loading: false } });
        });
    }

    getRecommendations = () => {
        this.state.recommended.tracks.forEach(track => track.audio.pause());
        this.setState({ recommended: { loading: true } });
        let seed = this.pickRandom(this.state.playlist.tracks.map(track => track.id), 5).toString()
        Spotify.getRecommendations(seed).then(recommendations => {
            this.setState({ recommended: { tracks: recommendations, loading: false } });
        });
    }

    pickRandom = (arr, count) => {
        let _arr = [...arr];
        return [...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
    }

    addTrack = (track) => {
        if (!this.state.playlist.tracks.find(savedTrack => savedTrack.id === track.id)) {
            let updatedPlaylistTracks = this.state.playlist.tracks;
            updatedPlaylistTracks.unshift(track);
            let updatedSearchResults = this.state.searchResults.tracks;
            updatedSearchResults.splice(this.state.searchResults.tracks.indexOf(track), 1);
            let updatedRecommendedTracks = this.state.recommended.tracks;
            updatedRecommendedTracks.splice(this.state.recommended.tracks.indexOf(track), 1);
            this.setState({
                searchResults: { ...this.state.searchResults, tracks: updatedSearchResults },
                recommendedTracks: { ...this.state.recommendedTracks, tracks: updatedRecommendedTracks },
                playlist: { ...this.state.playlist, tracks: updatedPlaylistTracks }
            });
        }
    }

    removeTrack = (track) => {
        if (this.state.playlist.tracks.find(savedTrack => savedTrack.id === track.id)) {
            if (this.state.currentlyPlayingTrack === track.id) {
                this.pauseTrack(track);
            }
            let updatedPlaylistTracks = this.state.playlist.tracks;
            updatedPlaylistTracks.splice(this.state.playlist.tracks.indexOf(track), 1);
            this.setState({ playlist: { ...this.state.playlist, tracks: updatedPlaylistTracks } });
        }
    }

    playTrack = (track) => {
        if (this.state.currentlyPlayingTrack) {
            this.pauseAll();
        }
        track.audio.play();
        this.setState({ currentlyPlayingTrack: track.id });
    }

    pauseTrack = (track) => {
        if (this.state.currentlyPlayingTrack) {
            if (track) {
                track.audio.pause();
                this.setState({ currentlyPlayingTrack: '' });
            } else {
                let playingTrack = this.state.playlist.tracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) || this.state.searchResults.tracks.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id || this.state.recommended.tracks.find(recommendedTrack => this.state.currentlyPlayingTrack === recommendedTrack.id));
                if (playingTrack) {
                    playingTrack.audio.pause();
                }
                this.setState({ currentlyPlayingTrack: '' });
            }
        }
    }

    pauseAll = () => {
        this.state.playlist.tracks.forEach(track => track.audio.pause());
        this.state.searchResults.tracks.forEach(track => track.audio.pause());
        this.state.recommended.tracks.forEach(track => track.audio.pause());
    }

    updatePlaylistName = (name) => {
        let playlist = this.state.playlist;
        playlist.name = name;
        this.setState({ playlist: playlist });
    }

    togglePublic = () => {
        let playlist = this.state.playlist;
        playlist.public = !playlist.public;
        this.setState({ playlist: playlist });
    }

    savePlaylist = () => {
        this.pauseTrack();
        if (this.state.playlist.tracks.length && this.state.playlist.name) {
            this.setState({ playlist: { saving: true } });
            if (!this.state.playlist.id) {
                const trackURIs = this.state.playlist.tracks.map(track => track.uri);
                Spotify.savePlaylist(this.state.playlist.name, trackURIs)
                    .then(() => {
                        let freshPlaylist = {
                            id: '',
                            href: '',
                            name: 'New Playlist',
                            public: true,
                            tracks: [],
                            loading: false,
                            saving: false
                        };
                        this.setState({
                            playlist: freshPlaylist
                        });
                    }
                    );
            } else {
                let playlistDetails = {
                    name: this.state.playlist.name,
                    public: this.state.playlist.public
                };
                let trackURIs = this.state.playlist.tracks.map(track => track.uri);
                Spotify.changePlaylistDetails(this.state.playlist.id, playlistDetails);
                Spotify.replacePlaylistTracks(this.state.playlist.id, trackURIs).then(() => {
                    this.setState({
                        playlist: {
                            id: '',
                            href: '',
                            name: 'New Playlist',
                            public: true,
                            tracks: [],
                            loading: false
                        }
                    });
                });
            }
        }
    }

    getUserPlaylists = () => {
        this.setState({ userPlaylists: { loading: true } });
        Spotify.getPlaylists().then(userPlaylists => {
            let newPlaylist = {
                id: '',
                href: '',
                name: 'New Playlist',
                public: true,
                tracks: [],
                loading: false
            };
            userPlaylists.unshift(newPlaylist);
            this.setState({ userPlaylists: { playlists: userPlaylists, loading: false } });
        });
    }

    getPlaylistTracks = (playlist) => {
        this.pauseTrack();
        this.setState({ playlist: { loading: true } });
        Spotify.getPlaylistTracks(playlist.id).then(tracks => {
            playlist.tracks = tracks;
            this.setState({ playlist: { ...playlist, loading: false } });
        });
    }

    clearPlaylist = () => {
        this.state.playlist.tracks.forEach(track => track.audio.pause());
        let updatedPlaylist = this.state.playlist;
        updatedPlaylist.tracks = [];
        this.setState({ playlist: updatedPlaylist });
    }

    componentWillMount = () => {
        Spotify.getAccessToken();
        this.getUserPlaylists();
    }

    render() {
        return (
            <div className="App-container">
                <div className="header">
                    <h1><span className="highlight">MIX</span>in'</h1>
                    <a id='github' href="https://github.com/PrepareToPie/MIXin-" rel="noopener noreferrer"
                        target="_blank">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <Window className="Results" initialDispay={0}>
                            <WindowHeader>
                                <WindowHeaderItem>
                                    Search results
                                </WindowHeaderItem>
                                <WindowHeaderItem
                                    id="recommend"
                                    onClick={this.getRecommendations}>
                                    Recommended
                                </WindowHeaderItem>
                            </WindowHeader>
                            <WindowBody>
                                <SearchResults
                                    searchResults={this.state.searchResults}
                                    onAdd={this.addTrack}
                                    onPlay={this.playTrack}
                                    onPause={this.pauseTrack}
                                    playingTrack={this.state.currentlyPlayingTrack} />

                                <RecommendedResults
                                    recommended={this.state.recommended}
                                    onAdd={this.addTrack}
                                    onPlay={this.playTrack}
                                    onPause={this.pauseTrack}
                                    playingTrack={this.state.currentlyPlayingTrack} />
                            </WindowBody>
                        </Window>

                        <Window className="playlist-window"
                            initialDispay={0}
                            isSaving={this.state.playlist.saving}>
                            <WindowHeader>
                                <WindowHeaderItem onClick={this.getUserPlaylists}>
                                    Your playlists
                                </WindowHeaderItem>
                                <WindowHeaderItem
                                    id="recommend">
                                    Current playlist
                                </WindowHeaderItem>
                            </WindowHeader>
                            <WindowBody>
                                <PlaylistsList
                                    playlists={this.state.userPlaylists.playlists}
                                    isLoading={this.state.userPlaylists.loading}
                                    onRemove={this.removeTrack}
                                    isRemoval={true}
                                    onPlaylistGet={this.getPlaylistTracks} />
                                <Playlist
                                    playlist={this.state.playlist}
                                    userPlaylists={this.state.userPlaylists}
                                    onRemove={this.removeTrack}
                                    onNameChange={this.updatePlaylistName}
                                    onSave={this.savePlaylist}
                                    onClear={this.clearPlaylist}
                                    onTogglePublic={this.togglePublic}
                                    onPlay={this.playTrack}
                                    onPause={this.pauseTrack}
                                    playingTrack={this.state.currentlyPlayingTrack} />

                            </WindowBody>
                        </Window>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
