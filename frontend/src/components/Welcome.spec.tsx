import React from "react";
import { mount } from "@cypress/react";
import Welcome from "./Welcome";

it("render welcome", () => {
  mount(<Welcome />);
  cy.get("h1").contains("Hello");
});
