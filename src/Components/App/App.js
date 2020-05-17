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
            playlistTracks: []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    search(term) {
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = this.state.playlistTracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            this.setState({searchResults: searchResultsToSet});
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

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        if (this.state.playlistTracks.length && this.state.playlistName) {
            const trackURIs = this.state.playlistTracks.map(track => track.uri);
            Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
                this.setState({
                    playlistName: 'New Playlist',
                    playlistTracks: []
                }));
        }
    }

    render() {
        return (
            <div>
                <h1>ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}/>
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
