import React from 'react'

//样式
import styles from '../index.module.scss'

//导入antd ui 组件
import {Carousel, NavBar, Icon} from 'antd-mobile'

//导入公众方法
import {BASE_URL} from '../../../utils/API'

export default function Banner(props) {
	return (
		<div className={styles.HouseDetail_banner}>
			<Carousel infinite autoplay autoplayInterval={5000}>
				{props.houseImg.map(item => (
					<div key={item}>
						<img src={BASE_URL + item} alt="" />
					</div>
				))}
			</Carousel>
			<div className={styles.navBar}>
				<NavBar
					className={styles['am-navbar']}
					icon={<Icon type="left" />}
					onLeftClick={() => props.history.go(-1)}
					rightContent={[<Icon key="0" type="search" />]}>
					{props.titleName}
				</NavBar>
			</div>
		</div>
	)
}
