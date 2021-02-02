import React,{useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import HomePage from './containers/HomePage';
import {useSelector,useDispatch} from 'react-redux'
import {isUserLoggedIn} from './actions/auth.action'
import ProductDetailsPage from './containers/ProductDetailsPage';
import Cart from './containers/CartPage';
import {updateCart} from './actions/cart.action'
import CheckoutPage from './containers/CheckoutPage';


function App() {
const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
if(!auth.authenticate){
  dispatch(isUserLoggedIn())
}
  },[auth.authenticate, dispatch])

  useEffect(() => {
     dispatch(updateCart());
  }, [auth.authenticate,dispatch]);

  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path ='/' component={HomePage}></Route>
         <Route exact path ='/cart' component={Cart}></Route>
         <Route exact path ='/checkout' component={CheckoutPage}></Route>
         <Route  path ='/:productSlug/:productId/p' component={ProductDetailsPage}></Route>
         <Route  path ='/:slug' component={ProductListPage}></Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
