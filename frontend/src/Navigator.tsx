import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Stocks from "./containers/Stocks";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<Stocks />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
