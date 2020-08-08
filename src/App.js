import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

import Layout from "./pages/appLayout/mainLayout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { UserContext } from "./context/user";
import axios from "axios";

axios.defaults.withCredentials = true;

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  // console.log(isAuthenticated)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/events/overview",
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
};

const App = (...props) => {
  const { user, dispatch } = useContext(UserContext);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const url = ""; // "http://localhost:5000";
    axios
      .get(url + "/api/auth")
      .then((res) => {
        if (res.data.err === undefined) {
          dispatch({ type: "Login", payload: res.data.user });
        }
        setisloading(false);
      })
      .catch((err) => {
        console.error(err);
        setisloading(false);
      });
  }, []);
  let isAuthenticated = user !== null ? true : false;
  return isloading === true ? (
    <div></div>
  ) : (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/events/overview" />}
        />
        <Route
          exact
          path="/events"
          render={() => <Redirect to="/events/overview" />}
        />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          path="/events"
          component={Layout}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path="/login"
          component={Login}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
