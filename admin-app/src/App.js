import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import './App.css';

import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
