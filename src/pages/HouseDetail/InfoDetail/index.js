import React from 'react'

//导入样式
import styles from '../index.module.scss'
//导入外部组件
import {Flex} from 'antd-mobile'

export default class InfoDetail extends React.Component {
	render() {
		let {title, tags, price, roomType, size, oriented, floor} = this.props
		return (
			<div className={styles.infoDetail}>
				<div className={styles.info_title}>
					<h3>{title}</h3>
					{tags.map(item => (
						<span className={styles.tags} key={item}>
							{item}
						</span>
					))}
				</div>
				<div className={styles.info_price}>
					<Flex>
						<Flex.Item>
							<h2>
								{price} <span>/月</span>
							</h2>
							<p>租金</p>
						</Flex.Item>

						<Flex.Item>
							<h2>{roomType}</h2>
							<p>房型</p>
						</Flex.Item>

						<Flex.Item>
							<h2>
								{size}
								<span>平米</span>
							</h2>

							<p>面积</p>
						</Flex.Item>
					</Flex>
				</div>
				<div className={styles.info_basic}>
					<Flex>
						<Flex.Item>
							<div className="type">
								<span>装修:</span>精装
							</div>
							<div className="type">
								<span>楼层:</span>
								{floor}
							</div>
						</Flex.Item>
						<Flex.Item>
							<div className="type">
								<span>朝向:</span>
								{oriented[0]}
							</div>
							<div className="type">
								<span>类型:</span>普通住宅
							</div>
						</Flex.Item>
					</Flex>
				</div>
			</div>
		)
	}
}
