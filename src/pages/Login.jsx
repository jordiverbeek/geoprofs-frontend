import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const sendForm = () => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            return;
        } else {
            const data = {
                email: email,
                password: password
            }
            axios.post('https://geoprofs-backend.test/api/auth/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {
                    console.log(response.data.access_token);
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
    }

    useEffect(() => {
        setError('');
    }, [])

    return (
        <section data-testid='test-login' className='vlx-login vlx-auth-page'>
            <div className='container'>
                <div className='card'>
                    <h1>LOGIN</h1>
                    <div className='error-message'>
                        {error}
                    </div>
                    <div className='email-container'>
                        <label>Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='pw-container'>
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" onClick={sendForm}>Login</button>
                    <Link to={""}>
                        Wachtwoord vergeten?
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Login 