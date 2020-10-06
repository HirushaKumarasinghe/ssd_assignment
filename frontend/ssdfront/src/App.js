import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
// import ProtectedRoute from "./ProtectedRoute";
import Login from "./views/login/login";
import Upload from "./views/upload/upload";



class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: "false",
    };
  }

  setSignIn = (state) => {
    this.setState({
      signedIn: state,
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              strict
              path="/"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              strict
              path="/upload"
              render={(props) => <Upload {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;