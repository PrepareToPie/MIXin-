import React from 'react';
import './App.css';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/Searchbar';
import Spotify from '../../util/Spotify';


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
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this);
    }

    search(term) {
        if(this.state.currentlyPlayingTrack) {
            this.pauseTrack();
        }
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = this.state.playlistTracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            this.setState({searchResults: searchResultsToSet});
        });
    }

    getRecommendations(){
        if(this.state.currentlyPlayingTrack) {
            this.pauseTrack();
        }
        Spotify.getRecommendations(this.state.playlistTracks.map(track => track.id).toString()).then(recommendations => {
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
            this.setState({playlistTracks: updatedPlaylistTracks, searchResults: updatedSearchResults});
        }
    }

    removeTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            let updatedPlaylistTracks = this.state.playlistTracks;
            updatedPlaylistTracks.splice(this.state.playlistTracks.indexOf(track), 1);
            let updatedSearchResults = this.state.searchResults;
            updatedSearchResults.unshift(track);
            this.setState({playlistTracks: updatedPlaylistTracks, searchResults: updatedSearchResults});
        }
    }

    playTrack(track) {
        if (this.state.currentlyPlayingTrack) {
            let playingTrack = this.state.playlistTracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) || this.state.searchResults.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id);
            this.pauseTrack(playingTrack);
        }
        track.audio.play();
        this.setState({currentlyPlayingTrack: track.id});
    }

    pauseTrack(track) {
        if(track){
            track.audio.pause();
            this.setState({currentlyPlayingTrack: ''});
        } else {
            let playingTrack = this.state.playlistTracks.find(playlistTrack => this.state.currentlyPlayingTrack === playlistTrack.id) || this.state.searchResults.find(searchResult => this.state.currentlyPlayingTrack === searchResult.id);
            playingTrack.audio.pause();
            this.setState({currentlyPlayingTrack: ''});
        }
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
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

    render() {
        return (
            <div className="App-container">
                <h1>ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            recommendedTracks={this.state.recommendedTracks}
                            onAdd={this.addTrack}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
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
                            onRecommend={this.getRecommendations}
                            playingTrack={this.state.currentlyPlayingTrack}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
