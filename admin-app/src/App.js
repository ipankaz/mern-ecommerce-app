import React,{useEffect} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Products from './containers/Products';
import Orders from './containers/Orders';
import PrivateRoute from './components/HOC/PrivateRoute'
import {isUserLoggedIn} from './actions/auth.action'
import { useDispatch , useSelector} from "react-redux";


function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[])

  return (
    <>
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute  path="/products" component={Products}/>
        <PrivateRoute  path="/orders" component={Orders}/>
        <Route  path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        
      </Switch>
    </Router>
    </>
  );
}

export default App;
