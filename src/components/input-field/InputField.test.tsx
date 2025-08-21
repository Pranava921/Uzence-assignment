// src/components/input-field/InputField.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

test("renders InputField with label", () => {
  render(<InputField label="Name" />);
  expect(screen.getByText("Name")).toBeInTheDocument();
});

test("shows error message", () => {
  render(<InputField label="Name" invalid errorMessage="Required" />);
  expect(screen.getByText("Required")).toBeInTheDocument();
});

test("calls onChange", () => {
  const handleChange = jest.fn();
  render(<InputField label="Name" onChange={handleChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Test" } });
  expect(handleChange).toHaveBeenCalled();
});
