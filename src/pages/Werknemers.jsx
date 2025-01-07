import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import axios from 'axios';

const headers = {
    // "Authorization": "Bearer " + Cookies.get("bearer_token"),
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const WerknemerKaart = ({ naam, email }) => (
    <div className="werknemer-kaart">
        <img
            src="images/harold-jonker-vierkant.jpg"
            alt="Profielfoto"
            className="werknemer-foto"
        />
        <div className="werknemer-info">
            <h4>{naam}</h4>
            <p>{email}</p>
        </div>
    </div>
);

const WerknemerGroep = ({ groepNaam, werknemers }) => (
    <div className="werknemer-groep">
        <div className="groep-naam">
            <h3>{groepNaam}</h3>
            <hr />
        </div>
        <div className="werknemer-lijst">
            {werknemers.map((werknemer, index) => (
                <WerknemerKaart key={index} naam={werknemer.naam} email={werknemer.email} />
            ))}
        </div>
    </div>
);

const Werknemers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const gegroepeerdeWerknemers = werknemers.reduce((groepen, werknemer) => {
        if (!groepen[werknemer.groep]) {
            groepen[werknemer.groep] = [];
        }
        groepen[werknemer.groep].push(werknemer);
        return groepen;
    }, {});

    const [formData, setFormData] = useState({
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

        try {
            const response = await axios.post(
                'https://geoprofs-backend.vacso.cloud/api/users/create',
                formData,
                {
                    headers: {
                        Authorization: "Bearer ",
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setSuccessMessage('Registration successful!');
                console.log('Response:', response.data);

                // Clear form after successful submission
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
            } else {
                setErrorMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <section className='werknemers'>
            <header className="header">
                <h1 className='werknemers-header'>Werknemers</h1>
                <button className="toevoegen-knop" onClick={handleModalOpen}>
                    <FontAwesomeIcon className='icon-plus' icon={faPlus} />
                    Werknemer toevoegen
                </button>
            </header>

            {Object.entries(gegroepeerdeWerknemers).map(([groepNaam, groepWerknemers], index) => (
                <WerknemerGroep key={index} groepNaam={groepNaam} werknemers={groepWerknemers} />
            ))}

            {/* Modal voor Register Formulier */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="container-form">
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit} className="register-from">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Firstname"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="sure_name"
                                placeholder="Lastname"
                                value={formData.sure_name}
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
                                name="vac_days"
                                placeholder="Vacation days"
                                value={formData.vac_days}
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
                                name="max_vac_days"
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
        </section>
    );
};

export default Werknemers;
