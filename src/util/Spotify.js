const clientId = 'd0c690f8143d4f83b477e63edb8a0535';

const corsURL = 'https://cors-anywhere.herokuapp.com';
const redirURL = 'http://localhost:3000';

//spotify URLs
const authURL = 'https://accounts.spotify.com/authorize';
const apiURL = 'https://api.spotify.com/v1';

const scopes = 'playlist-modify-public';

let accessToken;
let expiry;

const Spotify = {
	getAccessToken() {
		if (!accessToken) {
			//if access token doesnt' exist, check the URL to see if there is a token in it
			const url_string = window.location.href;

			const a = url_string.match(/access_token=([^&;]*)/);
			const e = url_string.match(/expires_in=([^&]*)/);

			//if there is a token in the url, then use that value
			if (a && e) {
				accessToken = a[1];
				expiry = e[1];		

				window.setTimeout(() => accessToken = '', expiry * 1000);
				window.history.pushState('Access Token', null, '/')		

			}
			//if not, redirect to spotify to request access
			else {
				window.location.href = `${authURL}?client_id=${clientId}&response_type=token&redirect_uri=${redirURL}&scope=${scopes}`;

			}
		}
		
		return accessToken;
	},

	search(term) {

		const accessToken = Spotify.getAccessToken();
		const url = `${corsURL}/${apiURL}/search?type=track&q=${term}`;

		return fetch(url, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		.then(response => response.json())
		.then(jsonResponse => {
			if (jsonResponse.tracks) {
				return jsonResponse.tracks.items.map(track => {
					return {
						id: track.id,
						title: track.name,
						author: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
					}
				})
			}
			else {
				return [];
			}
		})
	},

	savePlaylist(playlistName, tracks) {
		const accessToken = Spotify.getAccessToken();

		const headers = {
			Authorization: `Bearer ${accessToken}`, 
			'Content-Type': 'application/json' 
		}

		//get user id from spotify api
		fetch(`${apiURL}/me`, {
				headers: headers
		})
		.then(response => response.json())
		.then(jsonResponse => jsonResponse.id)
		.then(userID => {
			return fetch(`${corsURL}/${apiURL}/users/${userID}/playlists`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ name: playlistName })
			})
		})
		.then(response => response.json())
		.then(jsonResponse => jsonResponse.id)
		.then(playlistID => {
			return fetch(`${corsURL}/${apiURL}/playlists/${playlistID}/tracks`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ "uris" : tracks })
			})
		})
	}
}

export default Spotify;