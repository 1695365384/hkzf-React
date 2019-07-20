import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="router-loading">LOADING</div>}>
        <div id="app">
          <Route path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
        </div>
      </Suspense>
    </Router>
  )
}

export default App
