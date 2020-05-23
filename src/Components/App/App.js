import React from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/Searchbar';
import Spotify from '../../util/Spotify';
import Results from "../Results/Results";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'My Playlist',
            playlistTracks: [],
            playlistSaving: false,
            recommendedTracks: [],
            currentlyPlayingTrack: ''
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.pauseAll = this.pauseAll.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this);
    }

    search(term) {
        this.pauseTrack();
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = this.state.playlistTracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            this.setState({searchResults: searchResultsToSet});
        });
    }

    getRecommendations() {
        this.state.recommendedTracks.forEach(track => track.audio.pause());
        let seed = this.state.playlistTracks.map(track => track.id).slice(0, 5).toString();
        Spotify.getRecommendations(seed).then(recommendations => {
            this.setState({recommendedTracks: recommendations});
            console.log(this.state.recommendedTracks);
        });
    }

    addTrack(track) {
        if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            let updatedPlaylistTracks = this.state.playlistTracks;
            updatedPlaylistTracks.push(track);
            let updatedSearchResults = this.state.searchResults;
            updatedSearchResults.splice(this.state.searchResults.indexOf(track), 1);
            let updatedRecommendedTracks = this.state.recommendedTracks;
            updatedRecommendedTracks.splice(this.state.recommendedTracks.indexOf(track), 1);
            this.setState({
                playlistTracks: updatedPlaylistTracks,
                searchResults: updatedSearchResults,
                recommendedTracks: updatedRecommendedTracks
            });
        }
    }

    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            let updatedPlaylistTracks = this.state.playlistTracks;
            updatedPlaylistTracks.splice(this.state.playlistTracks.indexOf(track), 1);
            let updatedSearchResults = this.state.searchResults;
            updatedSearchResults.unshift(track);
            let updatedRecommendedTracks = this.state.recommendedTracks;
            updatedRecommendedTracks.unshift(track);
            this.setState({
                playlistTracks: updatedPlaylistTracks,
                searchResults: updatedSearchResults,
                recommendedTracks: updatedRecommendedTracks
            });
        }
    }

    playTrack(track) {
        if (this.state.currentlyPlayingTrack) {
            // let playingTrack = this.state.playlistTracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) || this.state.searchResults.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id || this.state.recommendedTracks.find(recommendedTrack => this.state.currentlyPlayingTrack === recommendedTrack.id));
            // this.pauseTrack(playingTrack);
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
                let playingTrack = this.state.playlistTracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) || this.state.searchResults.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id || this.state.recommendedTracks.find(recommendedTrack => this.state.currentlyPlayingTrack === recommendedTrack.id));
                playingTrack.audio.pause();
                this.setState({currentlyPlayingTrack: ''});
            }
        } else {
            this.pauseAll();
        }
    }

    pauseAll(){
        this.state.playlistTracks.forEach(track => track.audio.pause());
        this.state.searchResults.forEach(track => track.audio.pause());
        this.state.recommendedTracks.forEach(track => track.audio.pause());
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        this.pauseTrack();
        if (this.state.playlistTracks.length && this.state.playlistName) {
            this.setState({playlistSaving: true});
            const trackURIs = this.state.playlistTracks.map(track => track.uri);
            Spotify.savePlaylist(this.state.playlistName, trackURIs)
                .then(() =>
                    this.setState({
                        playlistName: 'New Playlist',
                        playlistTracks: [],
                        playlistSaving: false
                    }));
        }
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
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                            playlistSaving={this.state.playlistSaving}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            playingTrack={this.state.currentlyPlayingTrack}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
