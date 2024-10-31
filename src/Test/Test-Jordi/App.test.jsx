import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../pages/Login';
import { MemoryRouter } from 'react-router-dom';

test('displays Sidebar components when route changes', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const email = screen.getByLabelText('email');
    const password = screen.getByLabelText('password');
    const loginButton = screen.getByText('Login');
});
