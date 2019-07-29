import React from 'react'

//自己的组件
import './index.scss'
import {headerStyle} from './staticData'
import Content from './Content'
import Filter from './component/Filter'
import SearchHeader from '../../component/SearchHeader'

export default class HoseList extends React.Component {
	render() {
		return (
			<div>
				<SearchHeader style={headerStyle} Green />
				<Filter />
				<Content />
			</div>
		)
	}
}
