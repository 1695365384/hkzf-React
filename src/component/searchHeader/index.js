import React from 'react'
import {Flex} from 'antd-mobile'

import propType from 'prop-types'
import {getCItyName} from '../../utils/auth'

import './index.scss'

class SearchHeader extends React.Component {
	state = {
		name: '上海',
	}

	componentDidMount() {
		this.setCItyNameAndLocal()
	}

	setCItyNameAndLocal = () => {
		let {label} = getCItyName()
		this.setState({
			name: label,
		})
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

export default SearchHeader
