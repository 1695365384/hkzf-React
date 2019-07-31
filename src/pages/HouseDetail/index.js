import React from 'react'
import axios from 'axios'

//样式
import styles from './index.module.scss'

//导入组件
import InfoDetail from './InfoDetail'
import Banner from './Banner'
import ShowMap from './ShowMap'
import HouseItem from './HouseItem'
import HouseDetailBtn from './HouseDetailBtn'

//导入公众方法
import {recommendHouses, BASE_URL} from './config'

export default class HouseDetail extends React.Component {
	state = {
		houseData: {},
		isFavorite: false,
	}
	componentDidMount() {
		this.getDetail()
	}
	async getDetail() {
		let houseID = this.props.history.location.pathname.split('/')[2]
		let res = await axios.get(`http://localhost:8080/houses/${houseID}`)
		this.setState({
			houseData: res.data.body,
		})
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
				<HouseDetailBtn isFavorite={this.state.isFavorite} />
			</div>
		)
	}
}
