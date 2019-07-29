import axios from 'axios'
const CITY_NAME = 'hkzf_city'

const getCItyName = () => JSON.parse(localStorage.getItem(CITY_NAME))

const setCItyName = value =>
	localStorage.setItem(CITY_NAME, JSON.stringify(value))

function isCityName(name) {
	if (!getCItyName()) {
		return false
	} else {
		let {label} = getCItyName()
		if (label === name) {
			return true
		} else {
			return false
		}
	}
}

function getGPS() {
	let cityName = getCItyName()
	if (!cityName) {
		return new Promise((resolve, reject) => {
			const myCIty = new window.BMap.LocalCity()
			myCIty.get(async result => {
				try {
					let name = result.name
					const res = await axios.get(`http://localhost:8080/area/info`, {
						params: {name: name},
					})
					resolve(res.data.body)
				} catch (e) {
					reject(e)
				}
			})
		})
	} else {
		return Promise.resolve(cityName)
	}
}

export {getCItyName, setCItyName, isCityName, getGPS}
