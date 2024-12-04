import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleActive = (buttonName) => {
        if (active === buttonName) {
            setActive('');
            return;
        } else {
            setActive(buttonName);
        }
    };

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
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
                        <Link className={active === 'verlof' ? 'active' : ''} onClick={() => { handleActive('verlof'); toggleModal(); }}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Verlof aanvragen
                        </Link>
                    </div>
                    <div className='container-bot'>
                        <Link to={'/settings'} className={active === 'settings' ? 'active' : ''} onClick={() => handleActive('settings')}>
                            <FontAwesomeIcon className='icons' icon={faGear} />
                            Settings
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
