import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// Redirect is used to Redirect
const PrivateRoute = ({ children, ...rest }) => {
  const {isAuthenticated, user} = useAuth0();
  const isUser = isAuthenticated && user;
  // rest refers to path login
  console.log(isAuthenticated, user);
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
