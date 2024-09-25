import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders with the correct label", () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders with the correct default props", () => {
    render(<Button label="Default Props" />);
    const buttonElement = screen.getByRole("button", {
      name: /default props/i,
    });
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).not.toBeDisabled();
  });

  test("renders with correct type, size, and variant", () => {
    render(
      <Button label="Submit" type="submit" size="large" variant="secondary" />
    );
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toHaveClass("btn-secondary");
    expect(buttonElement).toHaveClass("btn-large");
  });

  test("is disabled when the disabled prop is true", () => {
    render(<Button label="Can't Click" disabled />);
    const buttonElement = screen.getByRole("button", { name: /can't click/i });
    expect(buttonElement).toBeDisabled();
  });

  test("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Can't Click" onClick={handleClick} disabled />);
    const buttonElement = screen.getByRole("button", { name: /can't click/i });
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
