import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StateProvider } from "./logic/stateManagement";
import App from "./App";
import * as dataProcessing from "./logic/dataProcessing";
import * as formatDate from "./utils/formatDate";

// Mocking the handleFormSubmission function
jest.mock("./logic/dataProcessing", () => ({
  handleFormSubmission: jest.fn(),
}));

// At the beginning of the test file (or inside beforeEach)
beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock alert
});

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock alert
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  test("renders the form and submits valid data", async () => {
    dataProcessing.handleFormSubmission.mockImplementation((_, callback) => {
      callback(); // Call the callback immediately to simulate successful submission
    });

    render(
      <StateProvider>
        <App />
      </StateProvider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the modal to appear and check the submitted data
    await waitFor(() => {
      expect(screen.getByText(/Submission Successful/i)).toBeInTheDocument();
      expect(screen.getByText(/Submitted Data:/i)).toBeInTheDocument();
      expect(screen.getByText(/"name": "John Doe"/i)).toBeInTheDocument();
      expect(
        screen.getByText(/"email": "john.doe@example.com"/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/"password": "password123"/i)
      ).toBeInTheDocument();
    });
  });

  // Test case for form submission with validation errors
  test("shows alert on form submission with validation errors", async () => {
    render(<App />);

    // Simulate form submission (without filling required fields)
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    // Wait for the alert and check that it was called with the expected message
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Please correct the errors before submitting."
      );
    });
  });
  test("closes the modal when close button is clicked", async () => {
    dataProcessing.handleFormSubmission.mockImplementation((_, callback) => {
      callback();
    });

    render(
      <StateProvider>
        <App />
      </StateProvider>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Check that the modal appears
    await waitFor(() =>
      expect(screen.getByText(/Submission Successful/i)).toBeInTheDocument()
    );

    // Close the modal
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));

    // Check that the modal is closed
    expect(
      screen.queryByText(/Submission Successful/i)
    ).not.toBeInTheDocument();
  });
});
