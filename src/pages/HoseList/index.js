import React from 'react'
import {Flex} from 'antd-mobile'
import './index.scss'
import {headerStyle} from './staticData'
import Stick from './component/Stick'
import Content from './Content'
import Filter from './Filter'

import SearchHeader from '../../component/SearchHeader'

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
