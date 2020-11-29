import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeGrid from './pages/employeeGrid';
import AddEditPage from './pages/addEditEmployee';


export function App() {
  

  return (
    <BrowserRouter>
    <div className="row">
    
     <div className="col-md-8 offset-md-2">
          <Switch>
          <Route
                exact={true}
                path="/"
                component={EmployeeGrid}
              />
              <Route
                exact
                path="/EditPage/:key"
                component={AddEditPage}
              />
              <Route
                exact
                path="/AddPage"
                component={AddEditPage}
              />
          </Switch>
              
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
