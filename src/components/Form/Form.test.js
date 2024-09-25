import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
  const mockOnSubmit = jest.fn();
  const fields = [
    {
      name: "username",
      label: "Username",
      required: true,
      placeholder: "Enter your username",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      placeholder: "Enter your email",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields and submit button", () => {
    render(
      <Form onSubmit={mockOnSubmit} fields={fields} submitLabel="Submit" />
    );

    // Check if form fields are rendered
    fields.forEach((field) => {
      expect(screen.getByLabelText(field.label)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(field.placeholder)
      ).toBeInTheDocument();
    });

    // Check if submit button is rendered
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("validates required fields", () => {
    render(
      <Form onSubmit={mockOnSubmit} fields={fields} submitLabel="Submit" />
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check for validation error messages
    fields.forEach((field) => {
      expect(
        screen.getByText(`${field.label} is required`)
      ).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("calls onSubmit with valid data", () => {
    render(
      <Form onSubmit={mockOnSubmit} fields={fields} submitLabel="Submit" />
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check that onSubmit was called with the correct values
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
    });
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test("does not submit if any required fields are empty", () => {
    render(
      <Form onSubmit={mockOnSubmit} fields={fields} submitLabel="Submit" />
    );

    // Only fill in the username
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check that onSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  test("renders with initial values", () => {
    const initialValues = {
      username: "initialUser",
      email: "initial@example.com",
    };

    render(
      <Form
        onSubmit={mockOnSubmit}
        fields={fields}
        submitLabel="Submit"
        initialValues={initialValues}
      />
    );

    // Check if the initial values are rendered
    expect(screen.getByLabelText(/username/i).value).toBe("initialUser");
    expect(screen.getByLabelText(/email/i).value).toBe("initial@example.com");
  });
});
