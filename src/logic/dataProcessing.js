// logic/dataProcessing.js

/**
 * Validates form data based on specified rules.
 * @param {Object} formData - The form data to validate.
 * @param {Object} rules - Validation rules (e.g., required fields).
 * @returns {Object} - An object containing validation results and error messages.
 */
export const validateFormData = (formData, rules) => {
  const errors = {};
  let isValid = true;

  for (const field in rules) {
    if (rules[field].required && !formData[field]) {
      isValid = false;
      errors[field] = `${field} is required`;
    }
    // Add more validation rules as needed (e.g., email format, min length)
  }

  return { isValid, errors };
};

/**
 * Handles the submission of form data.
 * @param {Object} formData - The data to submit.
 * @param {Function} callback - A callback function to execute after submission.
 */
export const handleFormSubmission = (formData, callback) => {
  // Simulate an API call or processing
  setTimeout(() => {
    console.log("Form submitted:", formData);
    callback();
  }, 1000);
};

/**
 * Toggles the visibility of a modal based on its current state.
 * @param {boolean} isVisible - The current visibility state of the modal.
 * @returns {boolean} - The new visibility state of the modal.
 */
export const toggleModalVisibility = (isVisible) => {
  return !isVisible;
};

/**
 * Generates a unique ID for button actions, useful for tracking or logging.
 * @returns {string} - A unique identifier string.
 */
export const generateUniqueId = () => {
  return `btn-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Retrieves form data from a form element.
 * @param {HTMLFormElement} formElement - The form element to extract data from.
 * @returns {Object} - An object representing the form data.
 */
export const getFormData = (formElement) => {
  const formData = new FormData(formElement);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
};

/**
 * Checks if a button is disabled based on specified conditions.
 * @param {Object} conditions - Conditions to evaluate for disabling the button.
 * @returns {boolean} - True if the button should be disabled, false otherwise.
 */
export const isButtonDisabled = (conditions) => {
  return Object.values(conditions).some((condition) => condition);
};
