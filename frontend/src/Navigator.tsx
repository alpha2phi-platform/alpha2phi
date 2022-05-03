import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Signup from "./containers/Signup";

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/stocks" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
