import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faHome, faCalendarDays, faUserGroup, faSignOut, faPlus, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setManager(Cookies.get('role') === 'manager');
    }, [Cookies.get('role')]);

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
        const offset = formDate.getTimezoneOffset()
        var tmpDate = new Date(formDate.getTime() - (offset * 60 * 1000))

        const formattedDate = tmpDate.toISOString().split('T')[0];



        if (formattedDate === '1970-01-01' || formattedDate === '' || time === '' || reason === '' || (reason === '4' && customReason === '')) {
            setError('fill in the entire form');
            return;
        } else {
            let reasonMorning = '';
            let reasonAfternoon = '';
            if (time === 'Ochtend') {
                reasonMorning = reason;
                reasonAfternoon = 'aanwezig';
            } else if (time === 'Middag') {
                reasonMorning = 'aanwezig';
                reasonAfternoon = reason;
            } else if (time === 'Hele dag') {
                reasonMorning = reason;
                reasonAfternoon = reason;
            }

            console.log(
                formattedDate +
                reasonMorning +
                reasonAfternoon);

            axios.post(
                'https://geoprofs-backend.vacso.cloud/api/attendance/create',
                {
                    date: formattedDate,
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
            <div className="container-dropdown">
                {/* Clickable icon */}
                <div onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon className="icons dropdown" icon={faBars} />
                </div>

                {/* Sidebar */}
                <div className={`sidebar ${isOpen ? "open" : ""}`}>
                    <section data-testid="testSidebar" className='vlx-mobile-sidebar'>
                        <div className='container'>
                            <div className='container-top'>
                                <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                                <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                                <Link onClick={() => setIsOpen(false)} to={'/'}>
                                    <FontAwesomeIcon className='icons' icon={faHome} />
                                    Dashboard
                                </Link>
                                {Manager && (
                                    <>
                                        <Link onClick={() => setIsOpen(false)} id="werknemers-button" to={'/werknemers'}>
                                            <FontAwesomeIcon className='icons' icon={faUserGroup} />
                                            Werknemers
                                        </Link>
                                        <Link onClick={() => setIsOpen(false)} id="manager-dashboard-button" to={'/Verlof'}>
                                            <FontAwesomeIcon className='icons' icon={faBell} />
                                            Verlof
                                        </Link>
                                    </>
                                )}
                                <Link onClick={() => setIsOpen(false)} id="planning-button" to={'/planning'}>
                                    <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                                    Planning
                                </Link>
                                <Link id='verlof-aanvraag-button' onClick={toggleModal}>
                                    <FontAwesomeIcon className='icons' icon={faPlus} />
                                    Verlof aanvragen
                                </Link>
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
                                <div className="btn-group btn-group--vert">
                                    <button className='btn btn--small' id='submit' onClick={() => handleVerlofAanvraag(selectedDate, selectedButton, selectedReason, customReason)}>Bevestigen</button>
                                    <button className='btn btn--small' onClick={toggleModal}>Sluiten</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <section data-testid="testSidebar" className='vlx-sidebar'>
                <div className='container'>
                    <div className='container-top'>
                        <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                        <Link to={'/'}>
                            <FontAwesomeIcon className='icons' icon={faHome} />
                            Dashboard
                        </Link>
                        {Manager && (
                            <>
                                <Link id="werknemers-button" to={'/werknemers'}>
                                    <FontAwesomeIcon className='icons' icon={faUserGroup} />
                                    Werknemers
                                </Link>
                                <Link id="manager-dashboard-button" to={'/Verlof'}>
                                    <FontAwesomeIcon className='icons' icon={faBell} />
                                    Verlof
                                </Link>
                            </>
                        )}
                        <Link id="planning-button" to={'/planning'}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Planning
                        </Link>
                        <Link id='verlof-aanvraag-button' onClick={toggleModal}>
                            <FontAwesomeIcon className='icons' icon={faPlus} />
                            Verlof aanvragen
                        </Link>
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
                        <div className="btn-group btn-group--vert">
                            <button className='btn btn--small' id='submit' onClick={() => handleVerlofAanvraag(selectedDate, selectedButton, selectedReason, customReason)}>Bevestigen</button>
                            <button className='btn btn--small' onClick={toggleModal}>Sluiten</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
