import axios from 'axios'
import {Toast} from 'antd-mobile'
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
	const {status, description} = response.data
	Toast.loading('加载中', 0, null)
	if (status === 400) {
		Toast.info(description, 1, null)
		localStorage.removeItem('hkzf_user')
		Toast.hide()
	}
	if (status === 200) {
		Toast.hide()
	}
	return response
})

API.BASE_URL = BASE_URL

API.getToken = () => {
	return JSON.parse(localStorage.getItem('hkzf_user'))
}
API.isLogin = () => !!API.getToken()

API.removeToken = () => localStorage.removeItem('hkzf_user')

export {API, BASE_URL}
