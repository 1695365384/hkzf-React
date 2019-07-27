import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {Home, CItyList, map} from './RouterLink/router'
const App = () => {
	return (
		<Router>
			<Suspense fallback={<div className="router-loading">LOADING</div>}>
				<div id="app">
					<Route exact path="/" render={() => <Redirect to="/home" />} />
					<Route path="/home" component={Home} />
					<Route path="/city" component={CItyList} />
					<Route path="/map" component={map} />
				</div>
			</Suspense>
		</Router>
	)
}

export default App
