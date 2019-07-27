import React from 'react'
import './index.scss'
import {NavBar, Icon} from 'antd-mobile'
import styles from './index.module.css'
import {CityMap} from './GPS'
export default class Map extends React.Component {
	componentDidMount() {
		new CityMap('container')
	}
	render() {
		return (
			<div className="map">
				<NavBar
					mode="light"
					className={styles['am-navbar']}
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.go(-1)}>
					城市地图
				</NavBar>
				<div id="container">这是地图</div>
			</div>
		)
	}
}
