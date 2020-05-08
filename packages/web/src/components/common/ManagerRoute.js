import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { isManager } from "@project/common/dist/functions";

export default function ManagerRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedin === true && isManager(auth.user) ? (
          <Component {...props} />
        ) : (
            <Redirect to="/unauthorized" />
          )
      }
    />
  );
}

ManagerRoute.propTypes = {
  component: PropTypes.any.isRequired
};


