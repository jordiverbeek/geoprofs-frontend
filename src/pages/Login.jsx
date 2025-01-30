import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const sendForm = () => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;

        } else {
            const data = {
                email: email,
                password: password
            }
            setLoading(true);
            axios.post('https://geoprofs-backend.vacso.cloud/api/auth/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',

                }
            })
                .then(response => {
                    setLoading(false);

                    Cookies.set('bearer_token', response.data.access_token, {
                        expires: 1
                    });

                    axios.get('https://geoprofs-backend.vacso.cloud/api/user', {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('bearer_token')}`,
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }).then(response => {
                        Cookies.set('user', response.data, {
                            expires: 1
                        });
                        Cookies.set('role', response.data.user.role_slug, {
                            expires: 1
                        });
                       
                    }).catch(error => {
                        console.error('Error:', error);
                    });


                    console.log('Cookie set:', Cookies.get('bearer_token'));
                    navigate('/');
                })

                .catch(error => {
                    if (error.response) {
                        setError(error.response.data.message || 'Login failed');
                    } else if (error.request) {
                        setError('No response from the server. Please try again later.');
                    } else {
                        setError('An unexpected error occurred.');
                    }
                    console.error('Error:', error);
                });
        }
    };

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
                        <input id='email' type="email" aria-label='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='pw-container'>
                        <label>Password</label>
                        <input id='password' type="password" aria-label='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button id='login-button' type="submit" onClick={sendForm}>Login</button>
                    <Link to={""}>
                        Wachtwoord vergeten?
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Login 