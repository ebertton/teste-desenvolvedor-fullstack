import axios from 'axios';

const http = axios.create({
	baseURL: 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/'
});

export default http;