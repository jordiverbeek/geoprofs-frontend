import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [active, setActive] = useState('');
    const navigate = useNavigate();

    const handleActive = (buttonName) => {
        if (active === buttonName) {
            setActive('');
            return;
        } else {
            setActive(buttonName);
        }
    }

    return (
        <section data-testid="testSidebar" className='vlx-sidebar'>
            <div className='container'>
                <div className='container-top'>
                    <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                    <a to={'/'} className={active === 'dashboard' ? 'active' : ''} onClick={() => handleActive('dashboard')}>
                        <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                        Dashboard
                    </a>
                    <a to={'/werknemers'} className={active === 'werknemers' ? 'active' : ''} onClick={() => handleActive('werknemers')}>
                        <FontAwesomeIcon className='icons' icon={faUserGroup} />
                        Werknemers
                    </a>
                    <a to={'/planning'} className={active === 'planning' ? 'active' : ''} onClick={() => handleActive('planning')}>
                        <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                        Planning
                    </a>
                </div>
                <div className='container-bot'>
                    <a to={'/settings'} className={active === 'settings' ? 'active' : ''} onClick={() => handleActive('settings')}>
                        <FontAwesomeIcon className='icons' icon={faGear} />
                        Settings
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Sidebar;
