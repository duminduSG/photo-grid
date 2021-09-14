import axios from 'axios';

export const get = (url, config) => axios.get(url, config);

export const post = (url, data, config) => axios.post(url, data, config);
