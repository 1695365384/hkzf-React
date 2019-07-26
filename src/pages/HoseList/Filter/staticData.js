import React from 'react'
import {Flex, PickerView} from 'antd-mobile'
import axios from 'axios'
/***
 * 1. 拿数据然后将数据处理
 * 2. 将数据渲染到tabs上面
 * 3. 生成pickView
 * 4. 根据响应的数据来发送请求
 */

async function getTabs() {
	let res = await axios.get(
		'http://localhost:8080/houses/condition?id=AREA%7C88cff55c-aaa4-e2e0',
	)

	console.log(res)
}
getTabs()
//筛选栏
const tabList = {
	rentType: 'rentType',
	price: 'price',
	more: 'more',
	area: 'area',
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
export {tabs}
