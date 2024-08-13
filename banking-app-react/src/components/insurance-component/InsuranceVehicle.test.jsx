import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import InsuranceVehicle from "./InsuranceVehicle";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("InsuranceVehicle Component", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <InsuranceVehicle />
      </BrowserRouter>
    );

  test("renders without crashing", () => {
    setup();
    expect(
      screen.getByText(/Types of Vehicle Insurance Policies/i)
    ).toBeInTheDocument();
  });

  //   test("navigates to insurance page on button click", () => {
  //     const navigate = jest.fn();
  //     jest.mock("react-router-dom", () => ({
  //       ...jest.requireActual("react-router-dom"),
  //       useNavigate: () => navigate,
  //     }));

  //     setup();
  //     fireEvent.click(screen.getAllByText(/Start Quote/i)[0]);
  //     expect(navigate).toHaveBeenCalledWith("/insurance");
  //   });

  test("loads images correctly", () => {
    setup();
    expect(screen.getByAltText("vehicle header image")).toBeInTheDocument();
    expect(screen.getByAltText("RV Image")).toBeInTheDocument();
  });

  test("displays static texts correctly", () => {
    setup();
    expect(
      screen.getByText(/Accidents happen when we least expect them/i)
    ).toBeInTheDocument();
  });
});
