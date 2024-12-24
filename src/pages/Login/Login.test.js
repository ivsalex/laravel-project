import '@testing-library/jest-dom';  // Import jest-dom matchers
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Login} from './Login';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';

// Mock dependencies
jest.mock('axios');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('Login Component', () => {
    let mockLogin;
    let mockNavigate;

    beforeEach(() => {
        mockLogin = jest.fn();
        mockNavigate = jest.fn();

        useAuth.mockReturnValue({
            login: mockLogin,
            errors: {},
            setErrors: jest.fn(),
        });

        useNavigate.mockReturnValue(mockNavigate);
    });

    test('renders the login form', () => {
        render(<Login/>);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        // Use role and name to query the button
        expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument();
    });

    test('redirects to home page on successful login', async () => {
        // Mock successful login response
        mockLogin.mockResolvedValueOnce({success: true});

        render(<Login/>);

        // Fill in the login form
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: {value: 'test@example.com'}
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: {value: 'password123'}
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', {name: /login/i}));

        // Wait for the login process to complete
        await waitFor(() => {
            // Verify login was called with correct credentials as separate arguments
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
            // Verify navigation to home page
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('does not submit the form with empty fields', async () => {
        render(<Login/>);

        fireEvent.click(screen.getByRole('button', {name: /login/i}));

        await waitFor(() => {
            expect(mockLogin).not.toHaveBeenCalled();
            expect(axios.post).not.toHaveBeenCalled();
        });
    });

    test('disables login button after form submission', async () => {
        render(<Login/>);

        // Initially, the button should be enabled
        expect(screen.getByRole('button', {name: /login/i})).not.toBeDisabled();

        // Simulate filling in the form and submitting
        fireEvent.change(screen.getByLabelText(/email/i), {target: {value: 'admin@email.com'}});
        fireEvent.change(screen.getByLabelText(/password/i), {target: {value: 'admin'}});
        fireEvent.click(screen.getByRole('button', {name: /login/i}));

        // Wait for the form submission to complete
        await waitFor(() => {
            // After form submission, the button should be disabled
            expect(screen.getByRole('button', {name: /login/i})).toBeDisabled();
        });
    });

});
