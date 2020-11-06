import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isUserAuthenticated } from "../guards/auth-guard";
import { useSelector } from 'react-redux';

const PublicRoutes = ({ component: Component, ...rest }) => {
  const myReduxState = useSelector(state => state);
  return (
    <Route
      {...rest}
      render={props =>
        !myReduxState.reducer.userData.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: rest.redirectRoute, extras: {...rest.location}}} />
        )
      }
    />
  );
};

export default PublicRoutes;
