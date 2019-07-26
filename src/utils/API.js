import axios from 'axios'
// import {getToken, removeToken} from './auth'
const BASE_URL = 'http://localhost:8080'
const API = axios.create({
	baseURL: BASE_URL,
})

export {API, BASE_URL}
