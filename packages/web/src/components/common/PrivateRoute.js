import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { functions } from "@project/common";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);

  const navigate = (auth, props) => {
    if (!auth.isLoggedin) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              lastPath: window.location.pathname
            }
          }}
        />
      );
    }
    if (!functions.isActive(auth.user)) {
      return <Redirect to="/activate" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={props => navigate(auth, props)} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};
