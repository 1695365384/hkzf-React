import React from 'react'
import {Tabs, Flex, PickerView} from 'antd-mobile'
import {tabs} from './staticData'

import './index.scss'
import FilterTitle from './component/FilterTitle/index'
import FilterPick from './component/FilterPick'

export default class Filter extends React.Component {
	state = {
		isTabsHide: false,
	}
	changeTabs = () => {
		console.log('j哈哈哈')
	}
	render() {
		return (
			<div className="filters">
				<FilterTitle list={tabs} changeTabs={this.changeTabs} />
				<FilterPick />
				{/** <Tabs tabs={tabs} onTabClick={this.onTabClick} />*/}
				{this.state.isTabsHide ? <PickerView /> : ''}
			</div>
		)
	}
}
