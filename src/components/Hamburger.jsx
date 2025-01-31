import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faHome, faCalendarDays, faUserGroup, faSignOut, faPlus, faBell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';
import Cookies from 'js-cookie';

const HamburgerMenu = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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
    }, [Cookies.get('role')]);

    const handleLogout = () => {
        Cookies.remove('bearer_token', { path: '' });
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
        setMenuOpen(false);
        if (formSubmitted) {
            resetForm();
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const resetForm = () => {
        setSelectedDate(null);
        setSelectedReason('');
        setSelectedButton(null);
        setCustomReason('');
        setError(null);
        setMessage('');
        setFormSubmitted(false);
    };

    return (
        <>
            <div className="vlx-navbar">
                <h1 onClick={() => navigate('/')} className="vlx-navbar-title">Verlof Systeem</h1>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="vlx-navbar-icon" onClick={toggleMenu} />
            </div>
            {menuOpen && (
                <section data-testid="testSidebar" className='vlx-sidebar'>
                    <div className='container'>
                        <div className='container-top'>
                            <Link to={'/'}><FontAwesomeIcon className='icons' icon={faHome} /> Dashboard</Link>
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
                            <button id='verlof-aanvraag-button' onClick={toggleModal}>
                                <FontAwesomeIcon className='icons' icon={faPlus} />
                                Verlof aanvragen
                            </button>
                        </div>
                        <div className='container-bot'>
                            <Link id='logout-button' to={"auth/login"} onClick={handleLogout}>
                                <FontAwesomeIcon className='icons' icon={faSignOut} />
                                Logout
                            </Link>
                        </div>
                    </div>
                </section>
            )}
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content">
                        <h2>Verlof aanvragen</h2>
                        {error && <p className="error">{error}</p>}
                        {message && <p className='success'>{message}</p>}
                        <DatePicker id="date-picker" selected={selectedDate} onChange={setSelectedDate} dateFormat="dd/MM/yyyy" minDate={date} locale={enGB} />
                        <button className='btn btn--small' onClick={toggleModal}>Sluiten</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HamburgerMenu;