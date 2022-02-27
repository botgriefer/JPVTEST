import https, { Agent } from 'https';
import axios from 'axios';
import querystring from 'querystring';

function requestRedirectAsync(url) {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'fvs.io',
			port: 443,
			path: '/redirector?token=U0EyRVR4Y2NHZzJOcFVWdktsYUpqejN4WUZJVEYzaGV6bm43RTk3bUE4VGdXT3BDUW9ua2pjUWFWL0JrSGRsZ1pzN0xhUDB6TTBqMW80RU9kbEdmQXhKcEFhNWlwODdIYytocTB1NjUwUERwVXRFNGNhNU1uMzRaRVZnSzBoRHdFSHNFOVR5Tyt3S3h1RTVjZDg4MEtNZWkwWjNyeXUzZWZaVT06cU1iTDBHVCtQWkcxemJBSEsza2srdz09cHhL',
			method: 'GET',
			agent: new Agent({ rejectUnauthorized: false })
		};
		https
			.get(options, (res) => {
				console.log(res);
				resolve(res.headers.location);
			})
			.on('error', (e) => {
				console.error(e);
				// reject(e);
				resolve(null);
			});
	});
}

export async function get({ params }) {
	let code = params.code;
	let name = false;
	let img = false;
	let video = false;

	try {
		const response = await axios.get(`https://api.jpvhub.com/api/videos/${code}?lang=en`);
		// console.log(response);
		name = response.data.details.resourceName ?? false;
		img = response.data?.details?.imgPath ?? false;
		if (response.data?.details?.videoList) {
			let list = response.data.details.videoList;
			for (var i = 0; i < list.length; i++) {
				if (list[i].videoSourceName == 'AC Server') {
					let ac = list[i].linkArr[0];
					try {
						const response = await axios.post(
							`https://asianclub.tv/api/source/${ac.substr(ac.lastIndexOf('/') + 1)}`,
							querystring.stringify({ r: '', d: 'asianclub.tv' })
						);
						// console.log(response.data.data);
						let v = [];
						for (let vid of response.data.data) {
							const file = await requestRedirectAsync(vid.file);
							v.push({
								label: vid.label,
								file
							});
						}
						video = v;
					} catch (error) {
						console.error('E2', error);
					}
					break;
				}
			}
		}
	} catch (error) {
		console.error('E1', error);
	}

	return {
		body: {
			name,
			img,
			video
		}
	};
}
