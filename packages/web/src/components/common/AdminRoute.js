import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { isAdmin } from "@project/common/dist/functions";

export default function AdminRoute({ component: Component, ...rest }) {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedin === true && isAdmin(auth.user) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
}

AdminRoute.propTypes = {
  component: PropTypes.any.isRequired
};
