import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../libs/context";

function querystring(name, url = window.location.href) {
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

  console.log("redirect---", redirect);
  console.log("isAuthenticated---", isAuthenticated);
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={redirect ? redirect : "/dashboard"} />
  );
};

export default UnauthenticatedRoute;
