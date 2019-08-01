import React from 'react'
import styles from '../index.module.scss'
import './map.css'
//导入地图定位
import {getMapPosition} from './getMapPostion'
import HousePages from '../HousePages'
export default class ShowMap extends React.Component {
	componentDidMount() {
		getMapPosition('position_map', this.props.coord, this.props.community)
	}
	render() {
		return (
			<div className={styles.showMap}>
				<div className={styles.position}>小区:{this.props.community}</div>
				<div id="position_map" style={{height: '145px', width: '100%'}} />
				<div className={styles.about}>
					<div className={styles.houseTitle}>房屋配套</div>
					{this.props.supporting.length === 0 ? (
						<div className={styles.titleEmpty}>暂无数据</div>
					) : (
						<HousePages supporting={this.props.supporting} />
					)}
				</div>
			</div>
		)
	}
}
