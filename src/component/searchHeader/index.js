import React from 'react'
import {Flex} from 'antd-mobile'

import propType from 'prop-types'
import {getCurrentCity} from '../../utils'
import './index.scss'
import {withRouter} from 'react-router-dom'
class SearchHeader extends React.Component {
	state = {
		name: '上海',
	}

	async componentDidMount() {
		// this.setCItyNameAndLocal()
		let {label} = JSON.parse(localStorage.getItem('hkzf_city'))
		if (label) {
			this.setState({
				name: label,
			})
		} else {
			let {label} = getCurrentCity()
			this.setState({
				name: label,
			})
		}
	}

	render() {
		return (
			<Flex
				className={this.props.className || 'searchMap'}
				style={this.props.style}>
				<Flex
					justify="start"
					className="location"
					onClick={() => this.props.history.push('/city')}>
					<span className="name">{this.state.name}</span>
					<i className="iconfont icon-arrow" />
					<div className="form">
						<i className="iconfont icon-seach" />
						<span className="text">请输入小区或地址</span>
					</div>
				</Flex>

				<i
					style={this.props.Green ? {color: 'green'} : null}
					className="iconfont icon-map"
					onClick={() => this.props.history.push('/map')}
				/>
			</Flex>
		)
	}
}

SearchHeader.propType = {
	cityName: propType.string,
	className: propType.string,
}
SearchHeader = withRouter(SearchHeader)
export default SearchHeader
