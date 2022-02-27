import axios from 'axios';
import querystring from 'querystring';

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
						// console.log(response);
						video = response.data.data;
					} catch (error) {
						console.error(error);
					}
					break;
				}
			}
		}
	} catch (error) {
		console.error(error);
	}

	return {
		body: {
			name,
			img,
			video
		}
	};
}
