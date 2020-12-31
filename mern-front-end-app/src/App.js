
import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import HomePage from './containers/HomePage';

function App() {
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path ='/' component={HomePage}></Route>
         <Route  path ='/:slug' component={ProductListPage}></Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
