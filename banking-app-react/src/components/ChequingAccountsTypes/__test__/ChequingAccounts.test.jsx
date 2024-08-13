import { render,screen } from "@testing-library/react";
import ChequingAccounts from '../ChequingAccounts.tsx'
import React from 'react';
import '@testing-library/jest-dom';

describe("ChequingAccounts Component", () => {
    beforeEach(() => {
        render(<ChequingAccounts />);
    });

    test("should have a heading when rendered", () => {
        const heading = screen.getByRole("heading", {
            name: "Find the Right Chequing Account for your Needs",
        });
        expect(heading).toBeInTheDocument();
    });

    test("should have a learn more button when rendered", () => {
        const button = screen.getByRole("button", { name: "Learn More" });
        expect(button).toBeInTheDocument();
    });

    test("should have a paragraph when rendered", () => {
        const para = screen.getByText(
            "Discover everything you need to know about our chequing accounts and find the perfect fit for your financial needs. Explore features, benefits, fees (if any), and eligibility requirements to make an informed decision. Whether you're a student, a young professional, or a seasoned banker, we have the right chequing account for you."
        );
        expect(para).toBeInTheDocument();
    });
});

