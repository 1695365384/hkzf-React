import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
import './index.css'
import App from './app'
document.addEventListener(
	'touchstart',
	function(event) {
		event.preventDefault()
	},
	false,
)
ReactDOM.render(<App />, document.getElementById('root'))
