import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";

const Routes = () => {
  const { user } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/" exact>
        {user.token ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/login" exact>
        {user.token ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/dashboard" exact>
        {user.token ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route path="/plans" exact>
        {user.token ? <Plans /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
};

export default Routes;
