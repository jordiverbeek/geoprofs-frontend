import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';


const Werknemers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [werknemers, setWerknemers] = useState([]);

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
        firstname: '',
        lastname: '',
        role_slug: 'medewerker',
        email: '',
        password: '',
        bsn: '',
        date_of_service: '',
        sick_days: '',
        vacation_days: '',
        personal_days: '',
        max_vacation_days: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
                    role_slug: 'medewerker',
                    email: '',
                    password: '',
                    bsn: '',
                    date_of_service: '',
                    sick_days: '',
                    vac_days: '',
                    personal_days: '',
                    max_vac_days: ''
                });
            } else {
                setErrorMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
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

            <div className='wernemers-container'>
                {werknemers?.map((werknemer) => (
                    <div className="werknemers-lijst" key={werknemer.id}>
                        <div className="werknemer-kaart">
                            <div className="werknemer-info">
                                <h4>{werknemer.first_name}</h4>
                                <p>{werknemer.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
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
                                name="sick_days"
                                id='sick_days'
                                placeholder="Sick days"
                                value={formData.sick_days}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="vac_days"
                                id='vac_days'
                                placeholder="Vacation days"
                                value={formData.vac_days}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="personal_days"
                                id='personal_days'
                                placeholder="Personal days"
                                value={formData.personal_days}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="max_vac_days"
                                id='max_vac_days'
                                placeholder="Max vacation days"
                                value={formData.max_vac_days}
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
