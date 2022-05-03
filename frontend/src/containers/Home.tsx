import * as React from "react";
import Link from "@mui/material/Link";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import Title from "../components/Title";
import Stocks from "../components/Stocks";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Stocks1() {
  return (
    <React.Fragment>
      <Title>Dashboard</Title>
      <Stocks />
    </React.Fragment>
  );
}
