import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes} from 'react-router-dom';
import UserProfileSearch from '../components/user-profile/UserProfileSearch';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('UserProfileSearch', () => {


    test('renders UserProfileSearch component without crashing', () => {
        render(
            <Router>
                <UserProfileSearch />
            </Router>
        );
    });

    test('renders UserProfileSearch component', () => {
        render(<UserProfileSearch />);

        // Check if the input field is in the document
        const inputElement = screen.getByPlaceholderText(/Enter email/i);
        expect(inputElement).toBeInTheDocument();

        // Check if the button is in the document
        const buttonElement = screen.getByText(/Search/i);
        expect(buttonElement).toBeInTheDocument();
      });

      test('allows the user to enter their email', () => {
        render(<UserProfileSearch />);

        // Simulate user typing into input field
        fireEvent.change(screen.getByPlaceholderText('Enter email'), {
          target: { value: 'test@example.com' },
        });

        // Check if the input value has been updated
        expect(screen.getByPlaceholderText('Enter email')).toHaveValue('test@example.com');
      });


});
