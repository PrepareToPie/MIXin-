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
            playingTracks: [],
            currentlyPlaying: ''
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
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

    playTrack(trackUrl) {
        if (!this.state.playingTracks.find(track => track.src === trackUrl)) {
            let updatedTracks = this.state.playingTracks;
            let track = new Audio(trackUrl);
            updatedTracks.push(track);
            this.setState({playingTracks: updatedTracks});
        }
        this.state.playingTracks.forEach(track => {
            if (track.src !== trackUrl) {
                track.pause();
            } else {
                track.play();
            }
        });
        this.setState({currentlyPlaying: trackUrl});
    }

    pauseTrack(trackUrl) {
        if (this.state.playingTracks) {
            this.state.playingTracks.forEach(track => {
                if(track.src === trackUrl) {
                    track.pause();
                }
            })
            this.setState({currentlyPlaying: ''});
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
            <div>
                <h1>ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            playingTrack={this.state.currentlyPlaying}/>
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                            playlistSaving={this.state.playlistSaving}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            playingTrack={this.state.currentlyPlaying}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
