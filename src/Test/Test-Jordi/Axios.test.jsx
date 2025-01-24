import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import Login from '../../pages/Login'; // Adjust the import path as needed

vi.mock('axios');

describe('Login Component', () => {
    test('makes a successful POST request to Login', async () => {
        const mockResponse = { data: { access_token: 'dummy-token' } };
        
        // Mock axios post request
        axios.post.mockResolvedValueOnce(mockResponse);
        
        render(<Login />);

        // Simulate user typing in the email and password fields
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jordi@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testtesttest' } });

        // Simulate form submission
        fireEvent.click(screen.getByText(/login/i));

        // Wait for axios.post to be called and check the token
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://geoprofs-backend.test/api/auth/login',
                { email: 'jordi@gmail.com', password: 'testtesttest' },
                expect.any(Object)
            );
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'dummy-token');
        });
    });

    test('shows error message when password is too short', () => {
        render(<Login />);

        // Simulate user input with a short password
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jordi@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });

        // Simulate form submission
        fireEvent.click(screen.getByText(/login/i));

        // Check for error message
        expect(screen.getByText(/Password must be at least 8 characters long/)).toBeInTheDocument();
    });
});
