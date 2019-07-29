import React from 'react'
import styles from './index.module.scss'

import {Spring} from 'react-spring/renderprops'
const filterTagArr = ['户型', '朝向', '楼层', '房屋亮点']
export default class FilterMore extends React.Component {
	render() {
		if (this.props.FIlterMoreObj === {}) {
			return null
		}
		console.log(this.props)
		return (
			<Spring
				from={{transform: 'translateX(100%)'}}
				to={{
					transform: this.props.isMoreShow
						? 'translateX(0%)'
						: 'translateX(100%)',
				}}>
				{props => (
					<div style={props} className={styles.filterMore}>
						<div className="filter_more_tag">
							<dl>jskh</dl>
						</div>
						<div className="filter_more_btn" />
					</div>
				)}
			</Spring>
		)
	}
}
