import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Onboarding from './Components/Onboarding';
import Matching from './Components/Matching';
import Notifications from './Components/Notifications';
import Profile from './Components/Profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/onboarding" exact component={Onboarding} />
          <Route path="/match" exact component={Matching}/>
          <Route path="/profile" exact component={Profile} />
          <Route path="/notifications" exact component={Notifications}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
