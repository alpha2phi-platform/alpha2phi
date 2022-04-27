import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./containers/Home";
import Stocks from "./containers/Stocks";

export default function Navigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
