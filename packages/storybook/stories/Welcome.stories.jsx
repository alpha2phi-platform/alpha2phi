// Importing the react library
import React from "react";
// The storiesOf API is used to display stories in storybook
import { storiesOf } from "@storybook/react";
// Importing our react component
import Welcome from "../../../frontend/src/components/Welcome";
// Displaying the component
storiesOf("Welcome", module).add("Welcome component", () => (
  <Welcome name="alpha2phi"></Welcome>
));
