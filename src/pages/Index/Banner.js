import React from 'react'
import {Carousel} from 'antd-mobile'
import {API, BASE_URL} from '../../utils/API'

import '../../assets/fonts/iconfont.css'
import SearchHeader from '../../component/SearchHeader'

export default class Banner extends React.Component {
	state = {
		data: [],
		imgHeight: 176,
	}

	componentDidMount() {
		this.getImg()
	}

	async getImg() {
		let res = await API.get('/home/swiper')
		this.setState({
			data: res.data.body,
		})
	}

	renderContent = () => {
		return this.state.data.map(val => (
			<a href="###" key={val}>
				<img
					alt=""
					src={BASE_URL + val.imgSrc}
					style={{
						width: '100%',
						verticalAlign: 'top',
						height: this.state.imgHeight,
					}}
					onLoad={() => {
						window.dispatchEvent(new Event('resize'))
						this.setState({imgHeight: 'auto'})
					}}
				/>
			</a>
		))
	}

	cityList = () => {}

	render() {
		return (
			<div>
				<SearchHeader cityName={this.state.name} />
				<Carousel autoplay={true} infinite>
					{this.renderContent()}
				</Carousel>
			</div>
		)
	}
}
