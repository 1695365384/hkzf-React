import axios from 'axios';
// import {getToken, removeToken} from './auth'
const BASE_URL = 'http://localhost:8080';
const API = axios.create ({
  baseURL: BASE_URL,
});

// API.interceptors.request.use(config => {
//   const {url} = config
//   if (
//     url.startsWith('/user') &&
//     !url.startsWith('/user/login') &&
//     !url.startsWith('/user/registered')
//   ) {
//     // config.headers.Authorization = getToken()
//   }
// })

// API.interceptors.response.use(config => {
//   const {status} = config
//   if (status === 400) {
//     // removeToken()
//   }

//   return config
// })

export {API, BASE_URL};
