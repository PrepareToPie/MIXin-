const clientId = "f20636e447d54c409b9aa89de1d25d53";
const redirectURI = "http://localhost:3000/";
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // Check for an access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch;
            let expiresIn = Number(expiresInMatch[1]);
            // Clear parameters allowing us to grab new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken[1]}`
            }
        }).then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                        audio: new Audio(track.preview_url),
                        explicit: track.explicit,
                        external_url: track.external_urls.spotify,
                        isPlayable: !!track.preview_url
                    }));
                } else {
                    return [];
                }
            })
    },
    getRecommendations(seed) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seed}`, {
            headers: {
                Authorization: `Bearer ${accessToken[1]}`
            }
        }).then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                        audio: new Audio(track.preview_url),
                        explicit: track.explicit,
                        external_url: track.external_urls.spotify
                    }));
                } else {
                    return [];
                }
            })
    },
    savePlaylist(playlistName, trackURIs) {
        if (playlistName && trackURIs.length) {
            const accessToken = this.getAccessToken();
            let headers = {
                Authorization: `Bearer ${accessToken[1]}`,
                'Content-Type': 'application/json'
            }
            // A request that returns the user’s Spotify username
            return fetch('https://api.spotify.com/v1/me', {headers: headers})
                // Convert the response to JSON and save the response id parameter to the user’s ID
                .then(response => response.json())
                .then(jsonResponse => {
                    let userID = jsonResponse.id
                    // Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({name: playlistName})
                    }).then(response => response.json())
                        .then(jsonResponse => {
                            let playlistID;
                            playlistID = jsonResponse.id
                            // Use the returned user ID to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
                            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({uris: trackURIs})
                            }).then(response => response.json())
                                .then(jsonResponse => {
                                    playlistID = jsonResponse.id
                                });
                        });
                });
        }
    }
};

export default Spotify;