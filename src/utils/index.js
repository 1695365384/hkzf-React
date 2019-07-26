import axios from 'axios'

let currentCity = JSON.parse(localStorage.getItem('hkzf_city'))
function getCurrentCity() {
	if (!currentCity) {
		const myCity = new window.BMap.LocalCity()
		return new Promise(async resolve => {
			myCity.get(async result => {
				const cityName = result.name

				try {
					const res = await axios.get('http://localhost:8080/area/info', {
						params: {
							name: cityName,
						},
					})
					const {label, value} = res.data.body
					localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
				} catch (e) {
					console.log(e)
				}
			})
		})
	} else {
		return Promise.resolve(currentCity)
	}
}

export {getCurrentCity}
