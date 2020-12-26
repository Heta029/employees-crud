import React, { useContext } from 'react';
import { observer } from "mobx-react"
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { HashRouter, Router, Route, Switch } from 'react-router-dom';
import Admin from './layout/admin';
import Login from './pages/login/login';
import './assets/css/material-dashboard-react.css?v=1.6.0';
import { LoginStoreContext } from "./Stores/loginStore";


const App = observer(() => {
  const hist = createBrowserHistory();
  const loginStore = useContext(LoginStoreContext);

  return (
    <div>
      <Router history={hist}>
        <Switch>
          {loginStore.login ? <Route path="/" component={Admin} />
            : <Route path="/" component={Login} />}

        </Switch>
      </Router>
    </div>
  );

})

export default App;

