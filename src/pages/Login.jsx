import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const sendForm = () => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            return;
        } else {
            const data = {
                email: email,
                password: password
            }

            axios.post('https://geoprofs-backend.test/api/auth/login', data)
                .then(response => {
                    console.log(response.data.access_token)
                    localStorage.setItem('token', response.data.access_token);
                    setMessage(response)
                })
                .catch(error => {
                    console.error('Error:', error)
                    if (error.response.status === 401) {
                        setError('Email or password is incorrect')
                        return;
                    } else if(error.response.status === 422) {
                        setError('Email or password is incorrect')
                        return;
                    }
                })
        }
    }

    useEffect(() => {
        setError('');
    }, [])

    return (
        <section className='vlx-login'>
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