import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";

export default function Navigator() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}
