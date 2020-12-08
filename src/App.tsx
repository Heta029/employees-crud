import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { HashRouter,Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from './layout/admin';
import Login from './pages/login/login';
import AddEditPage from './pages/addEditEmployee'

import Button from './Components/CustomButtons/Button';
import './assets/css/material-dashboard-react.css?v=1.6.0';

function App() {
  const hist = createBrowserHistory();

  return (
  <div>
     <Router history={hist}>
    <Switch>
    <Route path="/login" component={Login} />
      {localStorage.getItem('id_token')?<Route path="/admin" component={Admin} />:<Route path="/admin" component={Login} />} 
      <Route path="/admin/employees" component={AddEditPage}/>  
      <Route path="/admin/editemployees/:key" component={AddEditPage} />    
      <Redirect from="/" to="/login" />
    </Switch>
   </Router>
  </div>
  );
  
}


export default App;