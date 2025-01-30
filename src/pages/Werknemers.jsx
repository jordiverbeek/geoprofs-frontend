import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie';
import axios from 'axios';


const Werknemers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [werknemers, setWerknemers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    useEffect(() => {
        axios.get('https://geoprofs-backend.vacso.cloud/api/users', {
            headers: {
                Authorization: "Bearer " + Cookies.get("bearer_token"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(response => {
            setWerknemers(response.data.users);
        }).catch(error => {
            console.error('Error:', error);
        })
    }, []);


    const [formData, setFormData] = useState({
        first_name: '',
        sure_name: '',
        role_slug: '',
        email: '',
        password: '',
        bsn: '',
        date_of_service: '',
        used_attendance: '',
        max_attendance: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        console.log('Cookies:', Cookies.get("bearer_token"));
        console.log('Form data:', formData);

        try {
            const response = await axios.post('https://geoprofs-backend.vacso.cloud/api/users/create', formData, {
                headers: {
                    Authorization: "Bearer " + Cookies.get("bearer_token"),
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                },

            });

            if (response.status === 200) {
                setSuccessMessage('Registration successful!');
                console.log('Response:', response.data);

                // Clear form after successful submission
                setFormData({
                    first_name: '',
                    sure_name: '',
                    role_slug: '',
                    email: '',
                    password: '',
                    bsn: '',
                    date_of_service: '',
                    used_attendance: '',
                    max_attendance: ''
                });
            } else {
                setErrorMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        const fetchWerknemers = async () => {
            try {
                console.log('Bearer token:', Cookies.get('bearer_token'));
                const response = await axios.get('https://geoprofs-backend.vacso.cloud/api/users', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                        'Content-Type': 'application/json',
                        Accept: "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                console.log('Response:', response.data);
                setWerknemers(response.data.users || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchWerknemers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://geoprofs-backend.vacso.cloud/api/users/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
            setWerknemers(werknemers.filter(werknemer => werknemer.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleChangeRole = (e) => {
        setSelectedRole(e.target.value);
        setFormData({
            ...formData,
            role_slug: e.target.value
        });
    };

    return (
        <section className='werknemers' >
            <header className="header">
                <h1 className='werknemers-header'>Werknemers</h1>
                <button id='Register-user' className="toevoegen-knop" onClick={handleModalOpen}>
                    <FontAwesomeIcon className='icon-plus' icon={faPlus} />
                    <p className='toevoegen-tekst'>
                        Werknemer toevoegen
                    </p>
                </button>
            </header>



            {/* <WerknemerKaart  */}

            <div className="manager-container">
                <div className="page-title">Manager</div>
                <div className="page-subtitle">Overzicht van medewerkers</div>
                <div className="werknemers-list">
                    {werknemers.map((werknemer) => (
                        <div className="werknemer-row" key={werknemer.id}>
                            <div className="werknemer-col">
                                <div className="werknemer-name">
                                    {werknemer.first_name} {werknemer.sure_name}
                                    <span className={`role-tag ${werknemer.role_slug}`}>
                                        ({werknemer.role_slug === 'manager' ? 'Manager' : 'Werknemer'})
                                    </span>
                                </div>
                                <div className="werknemer-email">{werknemer.email}</div>
                            </div>
                            <div onClick={() => handleDelete(werknemer.id)} id='Delete_button' className='werknemer-verwijder'>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* Modal voor Register Formulier */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="container-form">
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit} className="register-from">
                            <input
                                type="text"
                                name="first_name"
                                id='first_name'
                                placeholder="Firstname"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="sure_name"
                                id='sure_name'
                                placeholder="Lastname"
                                value={formData.sure_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                id='email'
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                id='password'
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <select
                                id="role_slug"
                                name='role_slug'
                                value={selectedRole}
                                onChange={handleChangeRole}
                            >
                                <option value='' disabled> Kies een reden </option>
                                <option value="manager"> Manager </option>
                                <option value="medewerker">Medewerker</option>
                            </select>
                            <input
                                type="text"
                                name="bsn"
                                id='bsn'
                                placeholder="Bsn"
                                value={formData.bsn}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="date_of_service"
                                id='date_of_service'
                                placeholder="Date of service"
                                value={formData.date_of_service}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="used_attendance"
                                id='used_attendance'
                                placeholder="Gebruikte verlof dagen"
                                value={formData.used_attendance}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="max_attendance"
                                id='max_attendance'
                                placeholder="Max verlof dagen"
                                value={formData.max_attendance}
                                onChange={handleChange}
                                required
                            />

                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                            <button type="submit">Register</button>
                            <button onClick={handleModalClose}>Sluiten</button>
                        </form>
                    </div>
                </div>
            )}
        </section >
    );
};

export default Werknemers;
