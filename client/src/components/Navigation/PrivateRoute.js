import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import LandLordLogin from '../LandlordLogin';
import RenterLogin from '../RenterLogin';
import LandlordProfile from '../LandlordProfile';
import RenterProfile from '../RenterProfile';
import SearchRenters from '../SearchRenters';
import SearchUnits from '../SearchUnits';
import MyUnits from '../MyUnits';
import AddUnit from "../AddUnit";

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
      <Route path="/LandLordProfile" exact component={LandlordProfile} />
      <Route path="/RenterProfile" exact component={RenterProfile} />
      <Route path="/Community" exact component={SearchRenters} />
      <Route path="/SearchUnits" exact component={SearchUnits} />
      <Route path="/MyUnits" exact component={MyUnits} />
      <Route path="/AddUnit" exact component={AddUnit} />
      </Switch>
    </Router>
  );
}