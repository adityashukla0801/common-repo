import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Form.scss";
import Button from "../Button/Button";

const Form = ({ onSubmit, fields, submitLabel, initialValues = {} }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateFields = () => {
    let validationErrors = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      window.alert("Please correct the errors before submitting.");
    }
    if (validateFields()) {
      onSubmit(values);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name} // Ensure the id is set
            type={field.type || "text"}
            name={field.name}
            value={values[field.name] || ""}
            onChange={handleInputChange}
            placeholder={field.placeholder}
          />
          {errors[field.name] && (
            <p className="error-text">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <Button label={submitLabel} type="submit" />
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      placeholder: PropTypes.string,
    })
  ).isRequired,
  submitLabel: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
};

export default Form;
