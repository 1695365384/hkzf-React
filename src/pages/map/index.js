import React, {lazy} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import {NavBar, Icon} from 'antd-mobile'
import styles from './index.module.css'
import {CityMap} from './GPS'
import classNames from 'classnames'

const HouseItem = lazy(() => import('../HoseList/component/HouseItem'))

function ShowBottom(props) {
	return (
		<div className="isShowBottom">
			<div className="title" />
			{props.list.map(item => {
				return <HouseItem list={item} key={item.houseCode} />
			})}
		</div>
	)
}

export default class Map extends React.Component {
	state = {
		listData: [],
		isShow: false,
	}
	async componentDidMount() {
		let city = new CityMap('container')

		city.CityMapChange((list, status) => {
			this.setState({
				listData: list,
			})

			if (status === 'stop') {
				this.setState({
					isShow: true,
				})
			}
			console.log(this.state)
		})
	}

	render() {
		return (
			<div className="map" ref={this.ShowBottomRef}>
				<NavBar
					mode="light"
					className={styles['am-navbar']}
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.go(-1)}>
					城市地图
				</NavBar>
				<div id="container">这是地图</div>
				<div
					className={classNames(styles.houseList, {
						[styles.show]: this.state.isShow,
					})}>
					<div className={styles.titleWrap}>
						<h1 className={styles.listTitle}>房屋列表</h1>
						<a className={styles.titleMore} href="/home/list">
							更多房源
						</a>
					</div>
					<div className={styles.houseItems}>
						{this.state.listData.map(item => {
							return <HouseItem list={item} key={item.houseCode} />
						})}
					</div>
				</div>
			</div>
		)
	}
}
