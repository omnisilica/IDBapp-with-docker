import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

test("Login renders correctly", () => {
  render(<Login />);
  const loginMessage = screen.getByText("Login");
  expect(loginMessage).toBeInTheDocument();
});
