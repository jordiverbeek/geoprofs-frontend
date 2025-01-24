import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faCalendarDays, faUserGroup, faSignOut } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [customReason, setCustomReason] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [Manager, setManager] = useState(false);
    const [message, setMessage] = useState('');
    const date = new Date();

    useEffect(() => {
        setManager(Cookies.get('role') === 'manager');
        setManager(true);
    }, []);

    const handleClick = (button) => {
        setSelectedButton(button);
    };

    const handleLogout = () => {
        Cookies.remove('bearer_token', { path: '' });
        if (Cookies.get('bearer_token') === undefined) {
            console.log('Cookie removed');
            console.log('logging out');
        }
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);

        if (formSubmitted) {
            setSelectedDate(null);
            setSelectedReason('');
            setSelectedButton(null);
            setCustomReason('');
            setError(null);
            setMessage('');
            setFormSubmitted(false);
        }
    };

    const closeModal = (e) => {
        if (e.target.className === 'modal-overlay') {
            setModalOpen(false);
        }
        if (formSubmitted) {
            setSelectedDate(null);
            setSelectedReason('');
            setSelectedButton(null);
            setCustomReason('');
            setError(null);
            setMessage('');
            setFormSubmitted(false);
        }
    };

    const handleReasonChange = (e) => {
        setSelectedReason(e.target.value);
        if (e.target.value !== "Overig") {
            setCustomReason('');
        }
    };

    const handleCustomReasonChange = (e) => {
        setCustomReason(e.target.value);
    };

    const handleVerlofAanvraag = (formDate, time, reason, customReason) => {
        setError('');
        const date = new Date(formDate);
        const formattedDate = date.toISOString().split('T')[0];

        if (formattedDate === '1970-01-01' || formattedDate === '' || time === '' || reason === '' || (reason === '4' && customReason === '')) {
            setError('fill in the entire form');
            return;
        } else {
            let reasonMorning = '';
            let reasonAfternoon = '';
            if (time === 'Ochtend') {
                var reasonMorning = reason;
                var reasonAfternoon = 'aanwezig';
            } else if (time === 'Middag') {
                var reasonMorning = 'aanwezig';
                var reasonAfternoon = reason;
            } else if (time === 'Hele dag') {
                reasonMorning = reason;
                reasonAfternoon = reason;
            }

            axios.post(
                'https://geoprofs-backend.vacso.cloud/api/attendance/create',
                {
                    date: date,
                    morning: reasonMorning,
                    afternoon: reasonAfternoon,
                    description: customReason,
                },
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("bearer_token"),
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(response => {
                    setMessage('Verlof aanvraag is gelukt!');
                    setFormSubmitted(true);
                })
                .catch(error => {
                    console.error(error.response ? error.response.data : error.message);
                });
        }
    };

    return (
        <>
            <section data-testid="testSidebar" className='vlx-sidebar'>
                <div className='container'>
                    <div className='container-top'>
                        <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                        <Link to={'/'}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Dashboard
                        </Link>
                        <Link id="werknemers-button" to={'/werknemers'}>
                            <FontAwesomeIcon className='icons' icon={faUserGroup} />
                            Werknemers
                        </Link>
                        <Link to={'/planning'}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Planning
                        </Link>
                        <Link id='verlof-aanvraag-button' onClick={toggleModal}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Verlof aanvragen
                        </Link>
                        {Manager && (
                            <Link id="manager-dashboard-button" to={'/manager'}>
                                <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                                Manager Dashboard
                            </Link>
                        )}
                    </div>
                    <div className='container-bot'>
                        <Link id='logout-button' to={"auth/login"} onClick={handleLogout}>
                            <FontAwesomeIcon className='icons' icon={faSignOut} />
                            Logout
                        </Link>
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <h2>Verlof aanvragen</h2>
                        {error && <p className="error">{error}</p>}
                        {message && <p className='success'>{message}</p>}
                        <div className="body">
                            <h3>Datum</h3>
                            <DatePicker
                                id="date-picker"
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={date}
                                placeholderText="Selecteer een datum"
                                locale={enGB}
                            />
                            <h3>Tijd</h3>
                            <div className="buttons-tijd-container">
                                <button
                                    className={selectedButton === 'Ochtend' ? 'selected' : ''}
                                    onClick={() => handleClick('Ochtend')}
                                    id="ochtend"
                                >
                                    Ochtend
                                </button>
                                <button
                                    className={selectedButton === 'Middag' ? 'selected' : ''}
                                    onClick={() => handleClick('Middag')}
                                    id="middag"
                                >
                                    Middag
                                </button>
                                <button
                                    id="hele-dag"
                                    className={selectedButton === 'Hele dag' ? 'selected' : ''}
                                    onClick={() => handleClick('Hele dag')}
                                >
                                    Hele dag
                                </button>
                            </div>
                            <h3>Verlof reden</h3>
                            <select
                                id="verlof-reden"
                                value={selectedReason}
                                onChange={handleReasonChange}
                            >
                                <option value='' disabled> Kies een reden </option>
                                <option value="vakantie">Vakantie</option>
                                <option value="ziek">Ziek</option>
                                <option value="persoonlijk">Persoonlijk</option>
                                <option value="zwangerschap">Zwangerschap</option>
                                <option value="ouderschap">Ouderschap</option>
                                <option value="overig">Overig</option>
                            </select>

                            {/* Show text input when "Overig" is selected */}
                            {selectedReason === 'overig' && (
                                <>
                                    <label htmlFor="custom-reason">Specificeer uw reden:</label>
                                    <input
                                        type="text"
                                        id="custom-reason"
                                        value={customReason}
                                        onChange={handleCustomReasonChange}
                                        placeholder="Uw reden..."
                                    />
                                </>
                            )}
                        </div>
                        <div className="modal-bottom">
                            <button onClick={toggleModal}>Annuleren</button>
                            <button id='submit' onClick={() => handleVerlofAanvraag(selectedDate, selectedButton, selectedReason, customReason)}>Bevestigen</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
