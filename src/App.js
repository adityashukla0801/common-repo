// App.js
import React, { useState } from "react";
import { StateProvider, useAppState } from "./logic/stateManagement";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import {
  required,
  minLength,
  emailFormat,
  validateFormData,
} from "./utils/formatDate";
import { handleFormSubmission } from "./logic/dataProcessing";
import "./App.css";

const App = () => {
  const { state, toggleModal } = useAppState();
  const [modalData, setModalData] = useState(null);

  const fields = [
    {
      name: "name",
      label: "Name",
      required: true,
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      placeholder: "Enter your email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      required: true,
      placeholder: "Enter your password",
      type: "password",
    },
  ];

  const validationRules = {
    name: [required],
    email: [required, emailFormat],
    password: [required, minLength(6)],
  };

  const handleSubmit = (formData) => {
    const errors = validateFormData(formData, validationRules);

    if (Object.keys(errors).length === 0) {
      handleFormSubmission(formData, () => {
        setModalData(formData);
        toggleModal();
      });
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div className="app">
      <h1>Form Submission Example</h1>
      <Form onSubmit={handleSubmit} fields={fields} submitLabel="Submit" />

      <Modal
        isOpen={state.modalVisible}
        onClose={toggleModal}
        title="Submission Successful"
      >
        {modalData && (
          <div>
            <h3>Submitted Data:</h3>
            <pre>{JSON.stringify(modalData, null, 2)}</pre>
            <Button label="Close" onClick={toggleModal} variant="secondary" />
          </div>
        )}
        <p>Your submission was successful!</p>
      </Modal>
    </div>
  );
};

// Wrap the App component with the StateProvider to manage state
const Root = () => (
  <StateProvider>
    <App />
  </StateProvider>
);

export default Root;
