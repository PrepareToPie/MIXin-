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
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-read-private,playlist-modify-private&redirect_uri=${redirectURI}`;
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
                        external_url: track.external_urls.spotify,
                        isPlayable: !!track.preview_url
                    }));
                } else {
                    return [];
                }
            })
    },
    // A request that returns the user’s Spotify username
    getUserId() {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        }
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
            // Convert the response to JSON and save the response id parameter to the user’s ID
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.id) {
                    return jsonResponse.id;
                }
            });
    },
    async savePlaylist(playlistName, trackURIs) {
        if (playlistName && trackURIs.length) {
            const accessToken = this.getAccessToken();
            let headers = {
                Authorization: `Bearer ${accessToken[1]}`,
                'Content-Type': 'application/json'
            }
            let userID = await this.getUserId()
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
        }
    },
    getPlaylists() {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        };
        return fetch(`https://api.spotify.com/v1/me/playlists`, {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.items) {
                    return jsonResponse.items.map(item => ({
                        id: item.id,
                        href: item.href,
                        name: item.name,
                        public: item.public
                    }));
                } else {
                    return [];
                }
            })
    },
    getPlaylistTracks(playlistId) {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        };
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.items) {
                    return jsonResponse.items.map(item => ({
                        id: item.track.id,
                        name: item.track.name,
                        artist: item.track.artists[0].name,
                        album: item.track.album.name,
                        uri: item.track.uri,
                        audio: new Audio(item.track.preview_url),
                        explicit: item.track.explicit,
                        external_url: item.track.external_urls.spotify,
                        isPlayable: !!item.track.preview_url
                    }))
                } else {
                    return [];
                }
            })
    },
    removeTracksFromPlaylist(playlistId, trackURIs) {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        };
        let userID = this.getUserId()
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({tracks: trackURIs})
        }).then(response => response.json())
            .then(jsonResponse => jsonResponse.snapshot_id ? "deleted" : "error");
    },
    async replacePlaylistTracks(playlistId, trackURIs) {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        };
        let userID = await this.getUserId();
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({uris: trackURIs})
        }).then(response => response.json())
            .then(jsonResponse => jsonResponse);
    },
    async changePlaylistDetails(playlistId, playlistDetails) {
        const accessToken = this.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken[1]}`,
            'Content-Type': 'application/json'
        };
        let userID = await this.getUserId()
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(playlistDetails)
        });
    }
};

export default Spotify;