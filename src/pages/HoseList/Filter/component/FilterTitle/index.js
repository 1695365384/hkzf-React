import React, {useState} from 'react'
import {Flex} from 'antd-mobile'
import './index.scss'
function FilterTitle(props, change) {
	let [isShow, setIsShow] = useState(null)

	let {list} = props
	const [tabs, setList] = useState(list)

	function isShowClick(key) {
		setIsShow((isShow = key))
		console.log(change)
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
