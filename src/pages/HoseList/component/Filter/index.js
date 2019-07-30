import React from 'react'
import {Spring} from 'react-spring/renderprops'

import {getCItyName} from '../../../../utils/auth'
import {tabs, getChangeFilter} from '../../staticData'
import './index.scss'
import FilterPickView from './component/FIlterPickView'
import FilterTitle from './component/FilterTitle'
import Stick from '../../component/Stick'
import {FilterObj, switchFilterData} from './filterDataObject'
import FilterMore from './component/FilterMore'

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
		isMoreShow: false,
		FIlterMoreObj: {},
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
			} else {
				let {roomType, oriented, characteristic, floor} = res
				let obj = {roomType, oriented, characteristic, floor}
				this.setState({
					isMoreShow: true,
				})

				this.setState({
					FIlterMoreObj: obj,
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
	//筛选模态框的显示隐藏
	changeFilterShow = show => {
		this.setState({
			isFilterPickShow: !show,
			isMoreShow: !show,
		})
	}

	//点击不同选项显示不同的pick组件数据
	PickChange = val => {
		let {type} = this.state
		switchFilterData(type, val, FilterDataObject)
	}

	//点击确定按钮发送请求更新页面
	emitRsetFilterData = () => {
		this.setState({
			isFilterPickShow: false,
		})
		this.props.getFilterNewData(FilterDataObject)

		FilterDataObject = new FilterObj()
		let {value} = getCItyName()
		FilterDataObject.cityId = value
	}

	//更多选项里面的tags 标签点击事件
	filterMoreTags = filterMore => {
		this.props.filterMoreTags(filterMore)
	}
	render() {
		return (
			<>
				<Stick height={50}>
					{
						<div>
							<Spring
								from={{opacity: 0.5, display: 'none'}}
								to={{
									opacity: this.state.isFilterPickShow ? 1 : 0,
									display: this.state.isFilterPickShow ? 'block' : 'none',
								}}>
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
				<Spring
					from={{display: 'none', opacity: 0}}
					to={{
						display: this.state.isMoreShow ? 'block' : 'none',
						opacity: this.state.isMoreShow ? 1 : 0,
					}}>
					{props => (
						<div
							style={props}
							className="FilterMore_mask"
							onClick={() => this.setState({isMoreShow: false})}
						/>
					)}
				</Spring>
				<FilterMore
					FIlterMoreObj={this.state.FIlterMoreObj}
					isMoreShow={this.state.isMoreShow}
					changeFilterShow={this.changeFilterShow}
					filterMoreSpanClick={this.filterMoreSpanClick}
					filterMoreTags={this.filterMoreTags}
				/>
			</>
		)
	}
}
