// utils/FormatData.js

// Function to initialize form data
export const initializeFormData = (initialValues) => {
  return { ...initialValues, errors: {} };
};

// Function to handle input changes
export const handleInputChange = (formData, fieldName, value) => {
  return {
    ...formData,
    [fieldName]: value,
    errors: {
      ...formData.errors,
      [fieldName]: "",
    },
  };
};

// Function to validate form data
export const validateFormData = (formData, validationRules) => {
  const errors = {};

  for (const [field, rules] of Object.entries(validationRules)) {
    for (const rule of rules) {
      const errorMessage = rule(formData[field]);
      if (errorMessage) {
        errors[field] = errorMessage;
        break; // Stop validating this field on the first error found
      }
    }
  }

  return errors;
};

// Example validation rules
export const required = (value) => (value ? "" : "This field is required.");
export const minLength = (min) => (value) =>
  value.length >= min ? "" : `Minimum length is ${min} characters.`;
export const emailFormat = (value) =>
  /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format.";

// Function to reset form data
export const resetFormData = (initialValues) => {
  return initializeFormData(initialValues);
};
