import React from 'react'
import axios from 'axios'
import {Toast} from 'antd-mobile'
//自己的组件
import './index.scss'
import {getCItyName} from '../../utils/auth'
import {headerStyle} from './staticData'
import Content from './Content'
import Filter from './component/Filter'
import SearchHeader from '../../component/SearchHeader'

export default class HoseList extends React.Component {
	state = {
		list: [],
		count: 0,
		isLoading: false,
	}

	ListRef = React.createRef()

	value = ''
	label = ''
	async componentDidMount() {
		let {value, label} = await getCItyName()
		this.label = label
		this.value = value
		this.getHouseList()
	}

	async getHouseList() {
		Toast.loading('加载中', 3000, null, true)
		this.setState({
			isLoading: true,
		})

		let res = await axios.get('http://localhost:8080/houses', {
			params: {
				cityId: this.value,
				start: 1,
				end: 20,
			},
		})

		let {list, count} = res.data.body
		this.setState({
			list: list,
			count: count,
			isLoading: false,
		})
		Toast.hide()
	}

	getFilterNewData = filterObj => {
		axios.get('http://localhost:8080/houses', {params: filterObj}).then(res => {
			let {list, count} = res.data.body
			this.setState({
				list: list,
				count: count,
				isLoading: false,
			})
		})
		window.scrollTo(0, 0)
	}
	//Content 更新列表数据的回调函数
	updateList = list => {
		this.setState({
			list: list,
		})
	}

	//filter More 多条件筛选
	filterMoreTags = filterListMore => {
		Toast.loading('加载中...')
		let {value} = getCItyName()
		axios
			.get('http://localhost:8080/houses', {
				params: {
					cityId: value,
					more: filterListMore,
				},
			})
			.then(res => {
				let {list, count} = res.data.body
				this.setState({
					list: list,
					count: count,
					isLoading: false,
				})
				Toast.hide()
			})
	}
	render() {
		return (
			<div>
				<SearchHeader style={headerStyle} Green />
				<Filter
					getFilterNewData={this.getFilterNewData}
					filterMoreTags={this.filterMoreTags}
				/>
				<Content
					{...this.state}
					updateList={this.updateList}
					ref={this.ListRef}
				/>
			</div>
		)
	}
}
