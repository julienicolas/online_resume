import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { connect }  from 'react-redux';
import * as actions from '../containers/index/actions';

import Header       from '../components/header/header';
import Footer       from '../components/footer/footer';
import Home         from "./home";
import Subscription from "./subscription";
import Signin       from "./signin";
import Errors       from "./errors";
import Profile      from "./profile";

require("../assets/styles/app.css");

export class App extends Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token");
    if (token){
      this.props.signinByToken(token);
    }
  }

  render() {
    return (
      <div>
        < Header />
        <div className="container body_content p-t-4">
          <Errors />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Subscription} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
        < Footer />
      </div>
    );
  }
}

export default connect(null, actions)(App);
