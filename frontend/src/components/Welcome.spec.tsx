import React from "react";
import { mount } from "@cypress/react";
import Welcome from "./Welcome";

it("render welcome", () => {
  mount(<Welcome name="World" />);
  cy.get("h1").contains("Hello");
});
