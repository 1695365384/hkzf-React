import React from 'react'
import './index.scss'
let map = new window.BMap.Map('container') // 创建Map实例
map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件

map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true)

export default class Map extends React.Component {
	componentDidMount() {}

	_initMap = () => {}
	render() {
		return (
			<div className="map">
				<div id="container">这是地图</div>
			</div>
		)
	}
}
