const clientId = 'd0c690f8143d4f83b477e63edb8a0535';
const secret = '82c063291a264038b2404bb3be05e2b1';

const authURL = 'https://accounts.spotify.com/authorize'

let accessToken = '';

const Spotify = {
	getAccessToken() {
		console.log(window.location.href);
		var url_string = window.location.href;
		var url = new URL(url_string);
		var c = url.searchParams.get("#access_token");
		console.log(c);

		// if (accessToken) {
		// 	return new Promise(resolve => resolve(accessToken));
		// }
		// return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
		// 	method: 'POST'
		// })
		// .then(response => response.json())
		// .then(jsonResponse => accessToken = jsonResponse.access_token);
	},

	search(term, location, sortBy) {
		// const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
		// return Yelp.getAccessToken().then(() => {
		// 	return fetch(url, {
		// 		headers: {Authorization: `Bearer ${accessToken}`},
		// 	});
		// })
		// .then(response => response.json())
		// .then(jsonResponse => {
		// 	if (jsonResponse.businesses) {
		// 		return jsonResponse.businesses.map(business => {
		// 			return {
		// 				id: business.id,
		// 				imageSrc: business.image_url,
		// 				name: business.name,
		// 				address: business.location.address1,
		// 				city: business.location.city,
		// 				state: business.location.state,
		// 				zipCode: business.location.zip_code,
		// 				category: business.categories.title,
		// 				rating: business.rating,
		// 				reviewCount: business.review_count
		// 			}
		// 		})
		// 	}
		// })
	},

	savePlaylist(playlist) {

	}
}

export default Spotify;