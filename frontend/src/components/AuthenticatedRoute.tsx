import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../libs/context";

const AuthenticatedRoute = (props) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={`/login?redirect=${pathname}${search}`} />
  );
};

export default AuthenticatedRoute;
