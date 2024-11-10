import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Register from './Register';

jest.mock('axios');

test('Displays success message on successful registration', async () => {
  // Mock de axios POST-aanroep om een succesvolle response terug te geven
  axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful' } });

  render(<Register />);

  // Vul de formuliervelden in
  fireEvent.change(screen.getByPlaceholderText('Firstname'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Lastname'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByPlaceholderText('Bsn'), { target: { value: '123456789' } });
  fireEvent.change(screen.getByPlaceholderText('Date of service'), { target: { value: '2023-11-10' } });
  fireEvent.change(screen.getByPlaceholderText('Sick days'), { target: { value: '5' } });
  fireEvent.change(screen.getByPlaceholderText('Vacation days'), { target: { value: '10' } });
  fireEvent.change(screen.getByPlaceholderText('Personal days'), { target: { value: '3' } });
  fireEvent.change(screen.getByPlaceholderText('Max vacation days'), { target: { value: '20' } });

  // Verstuur het formulier
  fireEvent.click(screen.getByText('Register'));

  // Wacht tot het succesbericht wordt weergegeven
  const successMessage = await screen.findByText('Registration successful');
  expect(successMessage).toBeInTheDocument();
});
