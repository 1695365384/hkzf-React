import axios from 'axios'
import styles from './index.module.css'
import {Toast} from 'antd-mobile'

let BMap = window.BMap

let {label, value} = JSON.parse(localStorage.getItem('hkzf_city'))

class CityMap {
	constructor(container) {
		this.map = new BMap.Map(container)
		this.cityName = label
		this.cityId = value
		this.startZoom = 11
		this.listData = []
		this.isShow = false
		this._initMap = _initMap.bind(this)
		this._initMap()
	}
}

function _initMap() {
	Toast.loading('加载中', 0, null, true)
	//初始化地图数据
	const myGeo = new BMap.Geocoder()

	myGeo.getPoint(
		this.cityName,
		point => {
			if (point) {
				//  初始化地图
				this.map.centerAndZoom(point, this.startZoom)
				// 添加常用控件
				this.map.addControl(new BMap.NavigationControl())
				this.map.addControl(new BMap.ScaleControl())
			}
		},
		this.cityName,
	)

	addMask(this, this.map, this.cityId)
}

//遮盖物的样式
const MaskStyle = {
	cursor: 'pointer',
	border: '0px solid rgb(255, 0, 0)',
	padding: '0px',
	whiteSpace: 'nowrap',
	fontSize: '12px',
	color: 'rgb(255, 255, 255)',
	textAlign: 'center',
}
function getMaskList(id) {
	return new Promise(async resolve => {
		let res = await axios.get('http://localhost:8080/area/map', {
			params: {
				id: id,
			},
		})
		resolve(res.data.body)
	})
}

async function addMask(mapObj, map, id) {
	/**
	 * 遍历列表数据
	 */
	let list = await getMaskList(id)

	list.forEach(item => {
		let {latitude, longitude} = item.coord
		let position = new BMap.Point(longitude, latitude)
		let opts = {
			position,
			offset: new BMap.Size(30, -30), //设置文本偏移量
		}
		// 创建文本标注对象
		let label = new BMap.Label(
			`<div class="${styles.bubble}" >
        <h3 class="${styles.name}">${item.label}</h3>
        <p> ${item.count}套</p>
      </div>`,
			opts,
		)

		label.addEventListener('click', () => {
			let {label, value} = item

			setTimeout(() => {
				map.clearOverlays()
			}, 0)

			mapObj.startZoom = changeStartZoom(mapObj.startZoom)
			mapObj.cityName = label
			mapObj.cityId = value

			if (mapObj.startZoom < 15) {
				mapObj._initMap()
			} else {
				let {value} = item
				getListData(value, list => {
					mapObj.listData = list
					mapObj.isShow = true
					defineProperty(mapObj)
				})
			}
		})

		label.setStyle(MaskStyle)
		map.addOverlay(label)
	})
	Toast.hide()
}

function changeStartZoom(startZoom) {
	if (startZoom >= 11 && startZoom <= 12) {
		return 13
	} else if (startZoom > 12 && startZoom <= 14) {
		return 15
	} else {
		return 17
	}
}

async function getListData(id, callback) {
	let res = await axios.get('http://localhost:8080/houses', {
		params: {
			cityId: id,
		},
	})
	return callback(res.data.body.list)
}
function defineProperty(obj, getCurrentHose) {
	Object.keys(obj).forEach(item => {
		ObjectDefinePer(obj, item, obj[item], getCurrentHose)
	})

	function ObjectDefinePer(obj, key, value, getCurrentHose) {
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				return value
			},
			set(newVal) {
				value = newVal
				getCurrentHose && getCurrentHose(obj)
			},
		})
	}
}

export {CityMap, defineProperty}
