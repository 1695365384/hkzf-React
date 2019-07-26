import React from 'react'
import {SearchHeader} from '../../component'
import {Flex} from 'antd-mobile'
import './index.scss'
import {headerStyle} from './staticData'

import Stick from './component/Stick'
import Content from './content'
import Filter from './Filter'
export default class HoseList extends React.Component {
	render() {
		return (
			<div>
				<SearchHeader style={headerStyle} Green />
				<Stick height={50}>
					{
						<Flex className="navSort">
							<Filter />
						</Flex>
					}
				</Stick>
				<Content />
			</div>
		)
	}
}
