import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: /×/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("closes modal when overlay is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-overlay"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not close modal when modal content is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.click(screen.getByText("Modal Content"));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("closes modal with Escape key", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not close modal if Escape key is pressed when modal is not open", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
