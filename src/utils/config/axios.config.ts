import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  responseType: 'json',
  timeout: 6000,
  headers: {
    'Content-type': 'application/json',
  },
});