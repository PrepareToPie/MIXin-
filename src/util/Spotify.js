const clientId = "f20636e447d54c409b9aa89de1d25d53";
const redirectURI = "http://localhost:3000/";
var accessToken = "";

const Spotify = {
    getAccessToken: function () {
        if (accessToken) {
            return accessToken;
        }
        else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/);
            let expirationTime = window.location.href.match(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search: function (term) {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json())
        .then(jsonResponse => {
            if(jsonResponse){
                return jsonResponse.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            } else {
                return [];
            }
        })
    }
};

export default Spotify;