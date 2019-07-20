import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import home from './pages/Home/Home'

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="router-loading">LOADING</div>}>
        <div id="app">
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={home} />
        </div>
      </Suspense>
    </Router>
  )
}

export default App
