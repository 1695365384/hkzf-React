import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import CityList from './pages/CityList';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Route path="/Home" component={Home} />
        <Route path="/CityList" component={CityList} />
      </div>
    </Router>
  );
};

export default App;
