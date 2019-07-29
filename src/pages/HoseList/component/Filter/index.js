import React from 'react'
import {Spring} from 'react-spring/renderprops'

import {getCItyName} from '../../../../utils/auth'
import {tabs, getChangeFilter} from '../../staticData'
import './index.scss'
import FilterPickView from './component/FIlterPickView'
import FilterTitle from './component/FilterTitle'
import Stick from '../../component/Stick'
import {FilterObj, switchFilterData} from './filterDataObject'

//初始化筛选对象
let FilterDataObject = new FilterObj()
let {value} = getCItyName()
FilterDataObject.cityId = value

export default class Filter extends React.Component {
	state = {
		FIlterList: [],
		FIlterObject: {},
		filterCol: 3,
		isFilterPickShow: false,
		type: '',
	}

	getFilterList = type => {
		//点击筛选栏拿取相应的数据
		this.setState({
			type: type,
		})
		getChangeFilter(type, res => {
			if (type !== 'more') {
				this.setState({
					isFilterPickShow: true,
				})
			}

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
			isFilterPickShow: !show,
		})
	}

	PickChange = val => {
		let {type} = this.state
		switchFilterData(type, val, FilterDataObject)
	}

	emitRsetFilterData = () => {
		this.setState({
			isFilterPickShow: false,
		})
		this.props.getFilterNewData(FilterDataObject)
		FilterDataObject = new FilterObj()
		let {value} = getCItyName()
		FilterDataObject.cityId = value
	}
	render() {
		return (
			<div>
				<Stick height={50}>
					{
						<div>
							<Spring
								from={{opacity: 0.5}}
								to={{opacity: this.state.isFilterPickShow ? 1 : 0}}>
								{props => <div style={props} className="filterMask" />}
							</Spring>

							<div className="filters">
								<FilterTitle
									getFilterList={this.getFilterList}
									isFilterPickShow={this.state.isFilterPickShow}
									list={tabs}
								/>

								<FilterPickView
									emitRsetFilterData={this.emitRsetFilterData}
									PickChange={this.PickChange}
									FIlterList={this.state.FIlterList}
									filterCol={this.state.filterCol}
									isFilterPickShow={this.state.isFilterPickShow}
									changeFilterShow={this.changeFilterShow}
								/>
							</div>
						</div>
					}
				</Stick>
			</div>
		)
	}
}
