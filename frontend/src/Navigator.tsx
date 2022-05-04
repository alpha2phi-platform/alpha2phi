import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<UnauthenticatedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<UnauthenticatedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/logout" element={<UnauthenticatedRoute />}>
        <Route path="/logout" element={<Logout />} />
      </Route>

      <Route path="/signup" element={<UnauthenticatedRoute />}>
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/dashboard" element={<AuthenticatedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
