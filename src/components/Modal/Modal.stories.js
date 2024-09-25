import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../Button/Button";

export default {
  title: "Components/Modal",
  component: Modal,
};

// Example story for the modal
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Open Modal" onClick={() => setIsOpen(true)} />
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Modal Title",
  children: <p>This is the modal content!</p>,
};
