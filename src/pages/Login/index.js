import React from 'react'
import {NavBar, Icon, WingBlank, Toast} from 'antd-mobile'
import styles from './index.module.scss'

import {withFormik, Field, ErrorMessage, Form} from 'formik'

class Login extends React.Component {
	render() {
		return (
			<div className={styles.login}>
				{/**登录导航 */}
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.go(-1)}>
					账号登录
				</NavBar>

				<WingBlank>
					<Form>
						<div className={styles.userName}>
							<Field
								className={styles.input}
								name="username"
								placeholder="请输入账号"
								type="text"
							/>
							<ErrorMessage
								className={styles.error}
								name="username"
								component="div"
							/>
						</div>

						<div className={styles.passWord}>
							<Field
								className={styles.input}
								name="password"
								type="password"
								placeholder="请输入密码"
							/>
							<ErrorMessage
								className={styles.error}
								name="password"
								component="div"
							/>
						</div>

						<div className={styles.formSubmit}>
							<button className={styles.submit} type="submit">
								登 录
							</button>
						</div>
					</Form>
				</WingBlank>
			</div>
		)
	}
}
Login = withFormik({
	mapPropsToValues: () => ({username: '', password: ''}),

	// Custom sync validation
	validate: values => {
		const errors = {}
		let {username, password} = values
		if (!username || !password) {
			errors.username = '请输入账号'
			errors.password = '请输入密码'
			return errors
		} else if (username.length < 5 || password.length < 5) {
			errors.username = '请输入至少5位数字'
			errors.password = '请输入至少5位数字'
			return errors
		}
	},

	handleSubmit: async (values, {props}) => {
		console.log(values, props)
		let {username, password} = values
		let res = await window.API.post('http://localhost:8080/user/login', {
			username,
			password,
		})

		let {status, body, description} = res.data
		if (status === 200) {
			Toast.info(description, 1, null)
			localStorage.setItem('hkzf_user', JSON.stringify(body.token))
			props.history.go(-1)
		}
	},

	displayName: 'BasicForm',
})(Login)

export default Login
