import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5500",  // set our backend URL here
  withCredentials: true,             // if we use cookies / sessions
});

export default api;