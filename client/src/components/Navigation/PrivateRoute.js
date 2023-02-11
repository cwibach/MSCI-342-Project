import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import LandLordLogin from '../LandlordLogin';
import RenterLogin from '../RenterLogin';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/LandLordLogin" exact component={LandLordLogin} />
      <Route path="/RenterLogin" exact component={RenterLogin} />
      </Switch>
    </Router>
  );
}