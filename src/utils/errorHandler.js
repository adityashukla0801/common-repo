// utils/errorHandler.js

// Function to handle API errors
export const handleApiError = (error) => {
  let errorMessage;

  // Check if error has a response object for more detailed error messages
  if (error.response) {
    // The server responded with a status code outside the range of 2xx
    errorMessage = `Error: ${
      error.response.data.message || error.response.statusText
    } (Status: ${error.response.status})`;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage =
      "Error: No response received from the server. Please check your network connection.";
  } else {
    // Something happened in setting up the request
    errorMessage = `Error: ${error.message}`;
  }

  // Log the error to the console (for development purposes)
  console.error("API Error:", error);

  // Optionally, you could show a user-friendly alert or notification
  alert(errorMessage);
};

// Function to handle validation errors
export const handleValidationError = (validationErrors) => {
  const errorMessages = validationErrors
    .map((error) => error.message)
    .join(", ");

  // Log the validation error
  console.error("Validation Errors:", validationErrors);

  // Show a user-friendly alert with all error messages
  alert(`Validation Errors: ${errorMessages}`);
};

// Function to handle generic errors in the application
export const handleGenericError = (error) => {
  // Log the generic error
  console.error("Application Error:", error);

  // Show a generic error message to the user
  alert("An unexpected error occurred. Please try again later.");
};

// Optional: Centralized error logging to an external service
export const logErrorToService = (error) => {
  // Here you can send the error details to an external logging service
  // For example, using a service like Sentry, LogRocket, etc.
  // fetch('/log', {
  //   method: 'POST',
  //   body: JSON.stringify({ error }),
  //   headers: { 'Content-Type': 'application/json' },
  // });
};
