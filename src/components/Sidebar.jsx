import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enGB from 'date-fns/locale/en-GB';


const Sidebar = () => {
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [customReason, setCustomReason] = useState('');
    const date = new Date();



    const handleClick = (button) => {
        setSelectedButton(button);
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const closeModal = (e) => {
        if (e.target.className === 'modal-overlay') {
            setModalOpen(false);
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

    return (
        <>
            <section data-testid="testSidebar" className='vlx-sidebar'>
                <div className='container'>
                    <div className='container-top'>
                        <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                        <Link to={'/'} className={active === 'dashboard' ? 'active' : ''} onClick={() => handleActive('dashboard')}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Dashboard
                        </Link>
                        <Link to={'/werknemers'} className={active === 'werknemers' ? 'active' : ''} onClick={() => handleActive('werknemers')}>
                            <FontAwesomeIcon className='icons' icon={faUserGroup} />
                            Werknemers
                        </Link>
                        <Link to={'/planning'} className={active === 'planning' ? 'active' : ''} onClick={() => handleActive('planning')}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Planning
                        </Link>
                        <Link onClick={() => { toggleModal(); }}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Verlof aanvragen
                        </Link>
                    </div>
                    <div className='container-bot'>
                        <Link to={'/settings'} onClick={() => handleActive('settings')}>
                            <FontAwesomeIcon className='icons' icon={faGear} />
                            Settings
                        </Link>
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <h2>Verlof aanvragen</h2>
                        <div className="body">
                            <h3>Datum</h3>
                            <DatePicker
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
                                >
                                    Ochtend
                                </button>
                                <button
                                    className={selectedButton === 'Middag' ? 'selected' : ''}
                                    onClick={() => handleClick('Middag')}
                                >
                                    Middag
                                </button>
                                <button
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
                                <option value="" disabled>
                                    Kies een reden
                                </option>
                                <option value="Vakantie">Vakantie</option>
                                <option value="Ziekte">Ziekte</option>
                                <option value="Persoonlijk">Persoonlijk</option>
                                <option value="Ziekte">Zwangerschap</option>
                                <option value="Persoonlijk">Ouderschapsverlof</option>
                                <option value="Overig">Overig</option>
                            </select>

                            {/* Show text input when "Overig" is selected */}
                            {selectedReason === 'Overig' && (
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
                            <button onClick={toggleModal}>Bevestigen</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
