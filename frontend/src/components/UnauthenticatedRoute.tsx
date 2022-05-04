import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../libs/context";

function querystring(name: string, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const UnauthenticatedRoute = (props) => {
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
