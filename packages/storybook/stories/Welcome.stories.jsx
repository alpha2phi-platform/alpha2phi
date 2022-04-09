import React from "react";
import Welcome from "../../../frontend/src/components/Welcome";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Welcome",
  component: Welcome,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Welcome {...args} />;

export const Hello = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Hello.args = {
  name: "alpha2phi",
};
