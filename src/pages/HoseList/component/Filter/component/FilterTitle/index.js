import React, {useState} from 'react'
import {Flex} from 'antd-mobile'
import './index.scss'
function FilterTitle(props) {
	//控制菜单栏的颜色
	let [isShow, setIsShow] = useState(null)

	//从父组件中拿到列表和回调函数
	let {list, changeTabs} = props
	//将列表作为自己的状态保存
	const [tabs] = useState(list)

	function isShowClick(key) {
		setIsShow((isShow = key))
		changeTabs(key)
	}

	return (
		<Flex className="navSort">
			{tabs.map(item => (
				<Flex.Item key={item.key}>
					<span
						onClick={() => isShowClick(item.key)}
						className={isShow === item.key ? 'isShow' : ''}>
						{item.title}
					</span>
				</Flex.Item>
			))}
		</Flex>
	)
}

export default FilterTitle
