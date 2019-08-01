import {BASE_URL} from '../../utils/API'
const recommendHouses = [
	{
		id: 1,
		src: BASE_URL + '/img/message/1.png',
		desc: '72.32㎡/南 北/低楼层',
		title: '安贞西里 3室1厅',
		price: 4500,
		tags: ['随时看房'],
	},
	{
		id: 2,
		src: BASE_URL + '/img/message/2.png',
		desc: '83㎡/南/高楼层',
		title: '天居园 2室1厅',
		price: 7200,
		tags: ['近地铁'],
	},
	{
		id: 3,
		src: BASE_URL + '/img/message/3.png',
		desc: '52㎡/西南/低楼层',
		title: '角门甲4号院 1室1厅',
		price: 4300,
		tags: ['集中供暖'],
	},
]

function isLogined() {
	let login = JSON.parse(localStorage.getItem('hkzf_user'))
	return login ? true : false
}

function getLoginUser() {
	return JSON.parse(localStorage.getItem('hkzf_user'))
}

export {recommendHouses, BASE_URL, isLogined, getLoginUser}
