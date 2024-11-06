import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');
        console.log('Form Submitted', formData);

        axios.post('https://geoprofs-backend.vacso.cloud/host/api/users/create', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => {
                console.log('Registration successful', response);
                setSuccessMessage('Registration successful');
            })
            .catch((error) => {
                console.error('Registration error', error);
                setErrorMessage('Registration failed');
            });
    

            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                bsn: '',
                date_of_service: '',
                sick_days: '',
                vacation_days: '',
                personal_days: '',
                max_vacation_days: ''
            });

    };

    return (
        <div>
            <div data-testid="testRegister" className='container-form'>
                <h1>Register</h1>
                <div className='register-from'>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="bsn"
                        placeholder="Bsn"
                        value={formData.bsn}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date_of_service"
                        placeholder="Date of service"
                        value={formData.date_of_service}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="sick_days"
                        placeholder="Sick days"
                        value={formData.sick_days}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="vacation_days"
                        placeholder="Vacation days"
                        value={formData.vacation_days}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="personal_days"
                        placeholder="Personal days"
                        value={formData.personal_days}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="max_vacation_days"
                        placeholder="Max vacation days"
                        value={formData.max_vacation_days}
                        onChange={handleChange}
                        required
                    />

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <button type="submit" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;