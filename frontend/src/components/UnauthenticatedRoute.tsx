import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { querystring } from "../libs/formHooks";
import { useAppContext } from "../libs/context";

const UnauthenticatedRoute = () => {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");

  if (!isAuthenticated) {
    return <Outlet />;
  } else {
    if (redirect) {
      return <Navigate replace to={redirect} />;
    } else {
      return <Outlet />;
    }
  }
};

export default UnauthenticatedRoute;
