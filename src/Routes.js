import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import MyPlans from "./pages/MyPlans";
import Dashboard from "./pages/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/plans" exact component={MyPlans} />
    </Switch>
  );
};

export default Routes;
