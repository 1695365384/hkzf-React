import React from 'react'
import './index.scss'
import {_initMap} from './GPS'
import {NavBar, Icon} from 'antd-mobile'

export default class Map extends React.Component {
	componentDidMount() {
		_initMap('container')
	}
	render() {
		return (
			<div className="map">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log(this.props.history.go(-1))}>
					城市地图
				</NavBar>
				<div id="container">这是地图</div>
			</div>
		)
	}
}
