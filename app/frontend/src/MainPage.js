import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";

import Login from "./Loginscreen";
import LoginScreen from './Login';
import Apps from "./App";

const customHistory = createBrowserHistory();
function MainPage() {
  return (
    <BrowserRouter history={customHistory}>
      <div>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/App" component={Apps} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default MainPage;