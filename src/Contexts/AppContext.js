import React, {createContext, useContext, useEffect, useState} from 'react';
import Spotify from "../util/Spotify";
import PlayerContext from "./PlayerContext"

const AppContext = new createContext()

const AppContextProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState({tracks: [], isLoading: false})
    const [recommended, setRecommended] = useState({tracks: [], isLoading: false})
    const [userPlaylists, setUserPlaylists] = useState({playlists: [], isLoading: false})
    const [playlist, setPlaylist] = useState({
        id: '',
        href: '',
        name: 'New Playlist',
        isPublic: true,
        tracks: [],
        isLoading: false,
        isSaving: false
    })
    const {playingTrack, pauseTrack} = useContext(PlayerContext)


    // useEffect(() => {
    // }, [])

    const search = (term) => {
        pauseTrack();
        setSearchResults({...searchResults, isLoading: true});
        Spotify.search(term).then(searchResults => {
            let playlistTrackIds = playlist.tracks.map(track => track.id);
            let searchResultsToSet = searchResults.filter(result => playlistTrackIds.indexOf(result.id) === -1);
            setSearchResults({tracks: searchResultsToSet, isLoading: false});
        });

    }

    const getRecommendations = () => {
        recommended.tracks.forEach(track => track.audio.pause());
        this.setState({recommended: {isLoading: true}});
        let seed = playlist.tracks.map(track => track.id).slice(0, 5).toString();
        Spotify.getRecommendations(seed).then(recommendations => {
            this.setState({recommended: {tracks: recommendations, isLoading: false}});
        });
    }


    // const pauseAll = () => {
    //     playlist.tracks.forEach(track => track.audio.pause());
    //     searchResults.tracks.forEach(track => track.audio.pause());
    //     recommended.tracks.forEach(track => track.audio.pause());
    // }

    const addTrack = (track) => {
        if (
            !playlist.tracks.find(
                (savedTrack) => savedTrack.id === track.id
            )
        ) {
            let updatedPlaylistTracks = playlist.tracks;
            updatedPlaylistTracks.unshift(track);
            let updatedSearchResults = searchResults.tracks;
            updatedSearchResults.splice(
                searchResults.tracks.indexOf(track),
                1
            );
            let updatedRecommendedTracks = recommended.tracks;
            updatedRecommendedTracks.splice(
                recommended.tracks.indexOf(track),
                1
            );
            setSearchResults({...searchResults, tracks: updatedSearchResults})
            setRecommended({...recommended, tracks: updatedRecommendedTracks})
            setPlaylist({...playlist, tracks: updatedPlaylistTracks})
        }
    };

    const removeTrack = (track) => {
        if (
            playlist.tracks.find(
                (savedTrack) => savedTrack.id === track.id
            )
        ) {
            if (playingTrack.id === track.id) {
                pauseTrack();
            }
            let updatedPlaylistTracks = playlist.tracks;
            updatedPlaylistTracks.splice(
                playlist.tracks.indexOf(track),
                1
            );
            setPlaylist({...playlist, tracks: updatedPlaylistTracks});
        }
    };

    const changePlaylistName = (name) => {
        setPlaylist({...playlist, name});
    };

    const togglePublic = () => {
        setPlaylist(prevState => ({...prevState, isPublic: !prevState.isPublic}));
    };

    const savePlaylist = async () => {
        pauseTrack()
        if (playlist.tracks.length && playlist.name) {
            setPlaylist({...playlist, isSaving: true});
            if (!playlist.id) {
                const trackURIs = playlist.tracks.map((track) => track.uri);
                Spotify.savePlaylist(playlist.name, trackURIs).then(() => {
                    let freshPlaylist = {
                        id: "",
                        href: "",
                        name: "New Playlist",
                        isPublic: true,
                        tracks: [],
                        isLoading: false,
                        isSaving: false,
                    };
                    setPlaylist({freshPlaylist});
                });
            } else {
                let playlistDetails = {
                    name: playlist.name,
                    isPublic: playlist.isPublic,
                };
                let trackURIs = playlist.tracks.map((track) => track.uri);
                Spotify.changePlaylistDetails(playlist.id, playlistDetails);
                Spotify.replacePlaylistTracks(playlist.id, trackURIs).then(() => {
                    setPlaylist({
                        playlist: {
                            id: "",
                            href: "",
                            name: "New Playlist",
                            isPublic: true,
                            tracks: [],
                            isLoading: false,
                        },
                    });
                });
            }
        }
    };

    const getUserPlaylists = () => {
        setUserPlaylists({...userPlaylists, isLoading: true});
        Spotify.getPlaylists().then((userPlaylists) => {
            let newPlaylist = {
                id: "",
                href: "",
                name: "New Playlist",
                isPublic: true,
                tracks: [],
                isLoading: false,
            };
            setUserPlaylists(prevState => ({
                playlists: [newPlaylist, ...prevState.playlists],
                isLoading: false,
            }));
        });
    };

    const getPlaylistTracks = (playlist) => {
        pauseTrack()
        setPlaylist({...playlist, isLoading: true});
        Spotify.getPlaylistTracks(playlist.id).then((tracks) => {
            playlist.tracks = tracks;
            setPlaylist({...playlist, isLoading: false});
        });
    };

    const clearPlaylist = () => {
        pauseTrack()
        // playlist.tracks.forEach((track) => track.audio.pause());

        setPlaylist({...playlist, tracks: []});
    };


    return (
        <AppContext.Provider value={{
            searchContext: {
                searchResults,
                search
            },
            recommendedContext: {
                recommended,
                getRecommendations
            },
            userPlaylistsContext: {
                userPlaylists,
                getUserPlaylists
            },
            playlistContext: {
                playlist,
                addTrack,
                removeTrack,
                changePlaylistName,
                togglePublic,
                savePlaylist,
                getPlaylistTracks,
                clearPlaylist
            }
        }}>
            {children}
        </AppContext.Provider>
    );
}

export {AppContext as default, AppContextProvider}