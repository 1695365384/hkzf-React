import React from 'react'
import axios from 'axios'
import {Modal, Toast} from 'antd-mobile'

//样式
import styles from './index.module.scss'

//导入组件
import InfoDetail from './InfoDetail'
import Banner from './Banner'
import ShowMap from './ShowMap'
import HouseItem from './HouseItem'
import HouseDetailBtn from './HouseDetailBtn'

//导入公众方法
import {recommendHouses, BASE_URL, isLogined, getLoginUser} from './config'

export default class HouseDetail extends React.Component {
	state = {
		houseData: {},
	}
	componentDidMount() {
		this.getDetail()
	}
	async getDetail() {
		let houseID = this.props.history.location.pathname.split('/')[2]
		let {
			data: {body: isFavorite},
		} = await window.API.get(`http://localhost:8080/user/favorites/${houseID}`)
		let res = await axios.get(`http://localhost:8080/houses/${houseID}`)
		this.setState({
			houseData: res.data.body,
			isFavorite,
		})
	}

	handleFavorite = () => {
		if (!isLogined()) {
			Modal.alert('你还没有登录呢', '是否要登录?', [
				{
					text: '取消',
					onPress: () => Toast.fail('未能成功收藏', 1, null),
					style: 'default',
				},
				{text: '确定', onPress: () => this.props.history.push('/Login')},
			])
		} else {
			this.addFavorites()
		}
	}

	async addFavorites() {
		let houseID = this.props.history.location.pathname.split('/')[2]
		let res
		if (this.state.isFavorite) {
			res = await window.API.post(
				`http://localhost:8080/user/favorites/${houseID}`,
			)
		} else {
			res = await window.API.delete(
				`http://localhost:8080/user/favorites/${houseID}`,
			)
		}
		let {status} = res.data
		if (status === 200) {
			Toast.info(this.state.isFavorite ? '收藏成功' : '取消收藏成功', 1, null)
			this.setState({
				isFavorite: !this.state.isFavorite,
			})
		}
	}
	render() {
		if (Object.keys(this.state.houseData).length === 0) {
			return null
		}
		return (
			<div className={styles.HouseDetail}>
				<Banner
					houseImg={this.state.houseData.houseImg}
					history={this.props.history}
					titleName={this.state.houseData.community}
				/>
				<InfoDetail {...this.state.houseData} />

				<ShowMap
					community={this.state.houseData.community}
					coord={this.state.houseData.coord}
					supporting={this.state.houseData.supporting}
				/>

				{/* 房屋概况 */}
				<div className={styles.set}>
					<div className={styles.houseTitle}>房源概况</div>
					<div>
						<div className={styles.contact}>
							<div className={styles.user}>
								<img src={BASE_URL + '/img/avatar.png'} alt="头像" />
								<div className={styles.useInfo}>
									<div>王女士</div>
									<div className={styles.userAuth}>
										<i className="iconfont icon-auth" />
										已认证房主
									</div>
								</div>
							</div>
							<span className={styles.userMsg}>发消息</span>
						</div>

						<div className={styles.descText}>
							{this.state.houseData.description || '暂无房屋描述'}
						</div>
					</div>
				</div>

				{/* 推荐 */}
				<div className={styles.recommend}>
					<div className={styles.houseTitle}>猜你喜欢</div>
					<div className={styles.items}>
						{recommendHouses.map(item => (
							<HouseItem {...item} key={item.id} />
						))}
					</div>
				</div>

				{/**底部按钮 */}
				<HouseDetailBtn
					isFavorite={this.state.isFavorite}
					handleFavorite={this.handleFavorite}
				/>
			</div>
		)
	}
}
