import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutTeam from '../AboutTeam';


describe('AboutTeam', () => {
  test('renders Contact Customer support headline', () => {
    render(<AboutTeam />);
    const headlineElement = screen.getByText(/Contact Customer support/i);
    expect(headlineElement).toBeInTheDocument();
  });

  test('renders contact support button', () => {
    render(<AboutTeam />);
    const buttonElement = screen.getByText(/Contact Support/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders support message', () => {
    render(<AboutTeam />);
    const messageElement = screen.getByText(/We are waiting to help you and your team - so dont hesitate to reach out!/i);
    expect(messageElement).toBeInTheDocument();
  });
});