import axios from 'axios';

axios.defaults.withCredentials = true;

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/api',
});
