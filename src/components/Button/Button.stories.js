import React from "react";
import Button from "./Button";

// Default export for the Button component
export default {
  title: "Components/Button",
  component: Button,
};

// Example story for the default button
const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Click Me",
};

// Example story for a disabled button
export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled",
  disabled: true,
};

// Example story for a loading button
export const Loading = Template.bind({});
Loading.args = {
  label: "Loading...",
  isLoading: true,
};
