test('Clears form data after successful registration', async () => {
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
  
    // Wacht tot het succesbericht verschijnt
    await screen.findByText('Registration successful');
  
    // Controleer of de formuliervelden zijn gewist
    expect(screen.getByPlaceholderText('Firstname')).toHaveValue('');
    expect(screen.getByPlaceholderText('Lastname')).toHaveValue('');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('');
    expect(screen.getByPlaceholderText('Bsn')).toHaveValue('');
    expect(screen.getByPlaceholderText('Date of service')).toHaveValue('');
    expect(screen.getByPlaceholderText('Sick days')).toHaveValue('');
    expect(screen.getByPlaceholderText('Vacation days')).toHaveValue('');
    expect(screen.getByPlaceholderText('Personal days')).toHaveValue('');
    expect(screen.getByPlaceholderText('Max vacation days')).toHaveValue('');
  });
  