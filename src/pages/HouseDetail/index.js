import React from 'react'
import axios from 'axios'

//样式
import styles from './index.module.scss'

//导入antd ui 组件
import {Carousel} from 'antd-mobile'

//导入公众方法
import {BASE_URL} from '../../utils/API'

export default class HouseDetail extends React.Component {
	state = {
		houseData: {},
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
				<div className={styles.HouseDetail_banner}>
					<Carousel infinite autoplay autoplayInterval={5000}>
						{this.state.houseData.houseImg.map(item => (
							<div key={item}>
								<img src={BASE_URL + item} alt="" />
							</div>
						))}
					</Carousel>
				</div>
			</div>
		)
	}
}
