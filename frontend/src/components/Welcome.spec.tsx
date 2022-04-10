import React from "react";
import { mount } from "@cypress/react";
import Welcome from "./Welcome";

it("render stocks", () => {
  mount(<Welcome />);
  cy.get("h1").should("have.text", "Hello");
});
