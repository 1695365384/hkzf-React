import React from 'react'

import {tabs, getChangeFilter} from '../../staticData'
import './index.scss'
import FilterPickView from './component/FIlterPickView'
import FilterTitle from './component/FilterTitle/index'
import Stick from '../../component/Stick'

export default class Filter extends React.Component {
	state = {
		FIlterList: [],
		FIlterObject: {},
		filterCol: 3,
		isFilterPickShow: false,
	}

	getFilterList = type => {
		//点击筛选栏拿取相应的数据
		getChangeFilter(type, res => {
			this.setState({
				isFilterPickShow: true,
			})
			if (Object.prototype.toString.call(res) === '[object Object]') {
				this.setState({
					FIlterObject: res,
				})
			} else {
				let num = type === 'area' ? 3 : 1
				this.setState({
					FIlterList: res,
					filterCol: num,
				})
			}
		})
	}

	changeFilterShow = show => {
		this.setState({
			isFilterPickShow: false,
		})
	}
	render() {
		return (
			<>
				<Stick height={50}>
					{
						<div>
							<div className="filters">
								<div className="filterMask" />
								<FilterTitle
									getFilterList={this.getFilterList}
									isFilterPickShow={this.isFilterPickShow}
									list={tabs}
								/>
							</div>
							<FilterPickView
								FIlterList={this.state.FIlterList}
								filterCol={this.state.filterCol}
								isFilterPickShow={this.state.isFilterPickShow}
								changeFilterShow={this.changeFilterShow}
							/>
						</div>
					}
				</Stick>
			</>
		)
	}
}
