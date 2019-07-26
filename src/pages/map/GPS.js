import {getCurrentCity} from '../../utils'
import axios from 'axios'
import styles from './index.module.css'

//地图控件的位置,在local里面
let BMap = window.BMap

let top_left_control = new BMap.ScaleControl({
	anchor: window.BMAP_ANCHOR_TOP_LEFT,
})

let top_right_navigation = new BMap.NavigationControl({
	anchor: window.BMAP_ANCHOR_TOP_RIGHT,
	type: window.BMAP_NAVIGATION_CONTROL_SMALL,
})

async function _initMap(container) {
	//渲染地图
	let map = new BMap.Map(container)
	var point = new BMap.Point(116.404, 39.915)
	map.centerAndZoom(point, 11)

	// 创建点坐标
	let {label} = await getCurrentCity()
	map.centerAndZoom(label, 11)

	map.addControl(top_left_control)
	map.addControl(top_right_navigation)
	addMask(map)
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
async function addMask(map) {
	/**
	 * 遍历列表数据
	 */
	let list = await getMaskList()
	list.forEach(item => {
		let {latitude, longitude} = item.coord
		let position = new BMap.Point(longitude, latitude)
		let opts = {
			position,
			offset: new BMap.Size(30, -30), //设置文本偏移量
		}
		let label = new BMap.Label(
			`<div class="${styles.bubble}" >
        <h3 class="${styles.name}">${item.label}</h3>
        <p> ${item.count}套</p>
      </div>`,
			opts,
		) // 创建文本标注对象
		label.setStyle(MaskStyle)
		map.addOverlay(label)
	})
}

async function getMaskList() {
	let {value} = await getCurrentCity()
	let res = await axios.get('http://localhost:8080/area/map', {
		params: {
			id: value,
		},
	})
	return res.data.body
}

export {_initMap}
