import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Button, Modal} from 'antd-mobile'

//样式
import styles from './index.module.css'

//引入菜单的配置
import {menus} from './config'

//引入请求ajax的axios
const {API} = window
const {removeToken} = API
let {alert} = Modal
export default class Profile extends React.Component {
	state = {
		isLogin: API.isLogin(),
		// 用户信息
		userInfo: {},
	}
	componentDidMount() {
		this.getUserInfo()
	}
	async getUserInfo() {
		if (!this.state.isLogin) {
			return
		}

		let res = await API.get('/user')
		let {status, body} = res.data
		if (status === 200) {
			this.setState({
				userInfo: body,
			})
		}
		console.log(this.state, res)
	}
	logout = () => {
		alert('提示', '是否确定退出?', [
			{text: '取消'},
			{
				text: '退出',
				onPress: async () => {
					// 调用退出接口
					await API.post('/user/logout')

					// 移除本地token
					removeToken()

					// 处理状态
					this.setState({
						isLogin: false,
						userInfo: {},
					})
				},
			},
		])
	}

	render() {
		let {BASE_URL} = window.API
		const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
		const {history} = this.props
		const {
			isLogin,
			userInfo: {avatar, nickname},
		} = this.state

		return (
			<div>
				<div className={styles.root}>
					{/* 个人信息 */}
					<div className={styles.title}>
						<img
							className={styles.bg}
							src={BASE_URL + '/img/profile/bg.png'}
							alt="背景图"
						/>
						<div className={styles.info}>
							<div className={styles.myIcon}>
								<img
									className={styles.avatar}
									src={avatar ? BASE_URL + avatar : DEFAULT_AVATAR}
									alt="icon"
								/>
							</div>
							<div className={styles.user}>
								<div className={styles.name}>{nickname || '游客'}</div>
								{/* 登录后展示： */}
								{isLogin ? (
									<div>
										<div className={styles.auth}>
											<span onClick={this.logout}>退出</span>
										</div>
										<div className={styles.edit}>
											编辑个人资料
											<span className={styles.arrow}>
												<i className="iconfont icon-arrow" />
											</span>
										</div>
									</div>
								) : (
									<div className={styles.edit}>
										<Button
											type="primary"
											size="small"
											inline
											onClick={() => history.push('/login')}>
											去登录
										</Button>
									</div>
								)}

								{/* 未登录展示： */}
							</div>
						</div>
					</div>

					{/* 九宫格菜单 */}
					<Grid
						data={menus}
						columnNum={3}
						hasLine={false}
						renderItem={item =>
							item.to ? (
								<Link to={item.to}>
									<div className={styles.menuItem}>
										<i className={`iconfont ${item.iconfont}`} />
										<span>{item.name}</span>
									</div>
								</Link>
							) : (
								<div className={styles.menuItem}>
									<i className={`iconfont ${item.iconfont}`} />
									<span>{item.name}</span>
								</div>
							)
						}
					/>

					{/* 加入我们 */}
					<div className={styles.ad}>
						<img src={BASE_URL + '/img/profile/join.png'} alt="" />
					</div>
				</div>
			</div>
		)
	}
}
