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
import RenterSignup from '../RenterSignup';
import LandlordSignup from '../LandlordSignup';
import LandlordLogout from '../LandlordLogout';


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
      <Route path = "/RenterSignup" exact component ={RenterSignup} />
      <Route path = "/LandlordSignup" exact component ={LandlordSignup} />
      <Route path="/Community" exact component={SearchRenters} />
      <Route path="/SearchUnits" exact component={SearchUnits} />
      <Route path="/MyUnits" exact component={MyUnits} />
      <Route path="/AddUnit" exact component={AddUnit} />
      <Route path="/LandlordLogout" exact component={LandlordLogout} />
      </Switch>
    </Router>
  );
}