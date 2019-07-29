import React from 'react'
import {Flex} from 'antd-mobile'
import {getCItyName} from '../../utils/auth'
import axios from 'axios'

//头部样式
const headerStyle = {
	height: 50,
	top: 0,
	backgroundColor: '#efefef',
	padding: '0 15px 0 15px',
}
/***
 * 1. 拿数据然后将数据处理
 * 2. 将数据渲染到tabs上面
 * 3. 生成pickView
 * 4. 根据响应的数据来发送请求
 */
function getFilterPick() {
	let {value} = getCItyName()
	return new Promise(async resolve => {
		let list = await axios.get('http://localhost:8080/houses/condition', {
			params: {id: value},
		})
		resolve(list.data.body)
	})
}

async function getChangeFilter(type, callback) {
	let list = await getFilterPick()
	let FilterList = []

	switch (type) {
		case 'area':
			FilterList.push(list['area'])
			FilterList.push(list['subway'])
			return callback && callback(FilterList)

		case 'price':
			FilterList = list['price']
			return callback && callback(FilterList)

		case 'rentType':
			FilterList = list['rentType']
			return callback(FilterList)

		case 'more':
			let {roomType, oriented, floor, characteristic} = list
			return callback && callback({roomType, oriented, floor, characteristic})

		default:
			FilterList.push(list['area'])
			FilterList.push(list['subway'])
			return callback && callback(FilterList)
	}
}

const tabs = [
	{
		title: (
			<Flex.Item>
				区域
				<i type="down" className="iconfont icon-arrow" />
			</Flex.Item>
		),
		key: 'area',
	},
	{
		title: (
			<Flex.Item>
				方式
				<i type="down" className="iconfont icon-arrow" />
			</Flex.Item>
		),
		key: 'rentType',
	},
	{
		title: (
			<Flex.Item>
				租金
				<i type="down" className="iconfont icon-arrow" />
			</Flex.Item>
		),
		key: 'price',
	},
	{
		title: (
			<Flex.Item>
				筛选
				<i type="down" className="iconfont icon-arrow" />
			</Flex.Item>
		),
		key: 'more',
	},
]

export {headerStyle, tabs, getChangeFilter}
