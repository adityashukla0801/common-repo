import React from "react";
import Form from "./Form";

// Default export for the Form component
export default {
  title: "Components/Form",
  component: Form,
};

// Example story for the form
const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data) => console.log(data),
  fields: [
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ],
};
