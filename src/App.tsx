import React,{useContext} from 'react';
import { observer } from "mobx-react"
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { HashRouter,Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from './layout/admin';
import Login from './pages/login/login';
import AddEditPage from './pages/addEditEmployee'
import './assets/css/material-dashboard-react.css?v=1.6.0';
import EmployeeGrid from './pages/employeeGrid';
import { LoginStoreContext } from "./Stores/loginStore";


const App = observer(()=> {
  const hist = createBrowserHistory();
  const loginStore = useContext(LoginStoreContext);

  return (
  <div>
     <Router history={hist}>
    <Switch>
      {loginStore.login?<Route path="/" component={Admin} />      
      :<Route path="/" component={Login} />}      

    </Switch>
   </Router>
  </div>
  );
  
})
const mapStateToProps = ({ login: { isLogin } }:any) => ({
  isLogin
});
export default App;

