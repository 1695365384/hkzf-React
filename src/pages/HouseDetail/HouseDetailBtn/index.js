import React from 'react'
import {Flex} from 'antd-mobile'
import {BASE_URL} from '../../../utils/API'
import styles from '../index.module.scss'
export default class HouseDetailBtn extends React.Component {
	render() {
		return (
			<Flex className={styles.fixedBottom}>
				<Flex.Item onClick={this.props.handleFavorite}>
					<img
						src={
							BASE_URL +
							(!this.props.isFavorite ? '/img/star.png' : '/img/unstar.png')
						}
						className={styles.favoriteImg}
						alt="收藏"
					/>
					<span className={styles.favorite}>
						{!this.props.isFavorite ? '已收藏' : '收藏'}
					</span>
				</Flex.Item>
				<Flex.Item>在线咨询</Flex.Item>
				<Flex.Item>
					<a href="tel:400-618-4000" className={styles.telephone}>
						电话预约
					</a>
				</Flex.Item>
			</Flex>
		)
	}
}
