import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Onboarding from './Components/Onboarding';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/onboarding" exact component={Onboarding} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
