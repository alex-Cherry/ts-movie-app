import axios from 'axios';
// Interceptors
import interceptors from './interceptors';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    apikey: process.env.REACT_APP_API_KEY,
    plot: 'full'
  }
});

interceptors(instance);

export default instance;


