import axios from 'axios'
// import {getToken, removeToken} from './auth'
const BASE_URL = 'http://localhost:8080'
const API = axios.create({
	baseURL: BASE_URL,
})

API.interceptors.request.use(config => {
	config.headers.Authorization = JSON.parse(localStorage.getItem('hkzf_user'))
	return config
})

API.interceptors.response.use(response => {
	const {status} = response.data
	if (status === 400) {
		localStorage.removeItem('hkzf_user')
	}
	return response
})

export {API, BASE_URL}
