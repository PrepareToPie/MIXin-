import React, {useContext, useEffect} from 'react';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {PlaylistWindow} from '../Playlist/PlaylistWindow';
import {SearchBar} from '../SearchBar/Searchbar';
import Spotify from '../../util/Spotify';
import Results from "../Results/Results";
import AppContext from "../../Contexts/AppContext";


function App() {

    const {userPlaylistsContext: {getUserPlaylists}} = useContext(AppContext)
    useEffect(() => {
        Spotify.getAccessToken()
        getUserPlaylists()
    }, [])
    return (
        <div className="App-container">
            <div className="header">
                <h1><span className="highlight">MIX</span>in'</h1>
                <a id='github' href="https://github.com/PrepareToPie/MIXin-" rel="noopener noreferrer"
                   target="_blank">
                    <FontAwesomeIcon icon={faGithub}/>
                </a>
            </div>
            <div className="App">
                <SearchBar/>
                <div className="App-playlist">
                    <Results/>
                    <PlaylistWindow/>
                </div>
            </div>
        </div>
    );
}

export default App;
