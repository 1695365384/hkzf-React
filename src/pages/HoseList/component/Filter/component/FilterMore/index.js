import React from 'react'
import styles from './index.module.scss'
import {Spring} from 'react-spring/renderprops'
let selectCurrentList = []

export default class FilterMore extends React.Component {
	state = {
		selectList: [],
	}

	//点击添加选中的类型
	spanClick = key => {
		if (this.state.selectList.indexOf(key) <= -1) {
			selectCurrentList.push(key)
		} else {
			let index = selectCurrentList.findIndex(item => item === key)
			selectCurrentList.splice(index, 1)
		}
		this.setState({
			selectList: [...selectCurrentList],
		})
	}

	//渲染标签
	renderTagSpan = data => {
		let {selectList} = this.state
		return data.map(item => {
			let isSelected = selectList.indexOf(item.value) > -1
			return (
				<dd
					key={item.value}
					onClick={() => this.spanClick(item.value)}
					className={isSelected ? styles.isShowTags : ''}>
					{item.label}
				</dd>
			)
		})
	}

	//点击确定,刷新页面
	emitFilterMore = () => {
		let {selectList} = this.state
		selectList = selectList.join(',')
		this.props.filterMoreTags(selectList)
		this.props.changeFilterShow(this.props.isMoreShow)
		selectCurrentList = []
		this.setState({
			selectList: [],
		})
	}
	render() {
		if (Object.keys(this.props.FIlterMoreObj).length === 0) {
			return null
		}
		let {roomType, oriented, characteristic, floor} = this.props.FIlterMoreObj
		const dtTitle = [
			{text: '户型', obj: roomType, key: 'roomType'},
			{text: '朝向', obj: oriented, key: 'oriented'},
			{text: '亮点', obj: characteristic, key: 'characteristic'},
			{text: '楼层类型', obj: floor, key: 'floor'},
		]

		return (
			<Spring
				from={{transform: 'translateX(100%)'}}
				to={{
					transform: this.props.isMoreShow
						? 'translateX(0%)'
						: 'translateX(100%)',
				}}>
				{props => {
					return (
						<>
							<div className="filterMore" style={props}>
								<div className={styles.filter_more_tag}>
									<dl>
										{dtTitle.map(item => {
											return (
												<div className={styles.filterMore_item} key={item.key}>
													<dt>{item.text}</dt>
													<div className={styles.item_content}>
														{this.renderTagSpan(item.obj)}
													</div>
												</div>
											)
										})}
									</dl>
								</div>
							</div>
							<div style={props} className={styles.filter_more_btn}>
								<span
									onClick={() =>
										this.props.changeFilterShow(this.props.isMoreShow)
									}>
									取消
								</span>
								<span onClick={this.emitFilterMore}>确定</span>
							</div>
						</>
					)
				}}
			</Spring>
		)
	}
}
