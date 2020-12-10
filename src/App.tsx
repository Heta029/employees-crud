import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { HashRouter,Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from './layout/admin';
import Login from './pages/login/login';
import AddEditPage from './pages/addEditEmployee'
import { connect } from "react-redux";
import './assets/css/material-dashboard-react.css?v=1.6.0';
import EmployeeGrid from './pages/employeeGrid';

function App(props:any) {
  const hist = createBrowserHistory();

  return (
  <div>
     <Router history={hist}>
    <Switch>
      {props.isLogin?<Route path="/" component={Admin} />      
      :<Route path="/" component={Login} />}      

    </Switch>
   </Router>
  </div>
  );
  
}
const mapStateToProps = ({ login: { isLogin } }:any) => ({
  isLogin
});
export default connect(mapStateToProps)(App);

