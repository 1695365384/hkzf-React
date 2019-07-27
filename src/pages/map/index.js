import React, {lazy} from 'react'
import './index.scss'
import {NavBar, Icon} from 'antd-mobile'
import styles from './index.module.css'
import {CityMap, defineProperty} from './GPS'
import classNames from 'classnames'

const HouseItem = lazy(() => import('../HoseList/component/HouseItem'))

export default class Map extends React.Component {
	state = {
		listData: [],
		isShow: false,
	}
	componentDidMount() {
		let city = new CityMap('container')
		defineProperty(city, res => {
			let {listData, isShow} = res
			this.setState({
				listData: listData,
				isShow: isShow,
			})
			console.log(this.state, res)
		})
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
				<div
					className={classNames('isShowBottom', {
						[styles.show]: this.state.isShow,
					})}>
					<div className="title" />
					{this.state.listData.length > 0
						? this.state.listData.map(item => {
								return <HouseItem list={item} key={item.houseCode} />
						  })
						: ''}
				</div>
			</div>
		)
	}
}
