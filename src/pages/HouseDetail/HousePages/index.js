import React from 'react'
import styles from './index.module.scss'

//房屋配置
import {HOUSE_PACKAGE} from './config'
export default class HousePages extends React.Component {
	render() {
		return (
			<>
				<ul className={styles.HousePages}>
					{HOUSE_PACKAGE.map(item => {
						if (this.props.supporting.indexOf(item.name) > -1) {
							return (
								<li key={item.id} className={styles.HousePages_item}>
									<span className={`iconfont ${item.icon}`} />
									<p>{item.name}</p>
								</li>
							)
						}
					})}
				</ul>
			</>
		)
	}
}
