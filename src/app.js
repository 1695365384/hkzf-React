import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {Home, CItyList, map, HouseDetail, Login} from './RouterLink/router'
import {Toast} from 'antd-mobile'

const App = () => {
	return (
		<Router>
			<Suspense
				fallback={<div>{Toast.loading('加载中...', 2, null, true)}</div>}>
				<div id="app">
					<Route exact path="/" render={() => <Redirect to="/home" />} />
					<Route path="/home" component={Home} />
					<Route path="/city" component={CItyList} />
					<Route path="/map" component={map} />
					<Route path="/Login" component={Login} />
					<Route path="/HouseDetail/:houseCode" component={HouseDetail} />
				</div>
			</Suspense>
		</Router>
	)
}

export default App
