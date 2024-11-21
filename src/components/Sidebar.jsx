import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faGear, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    return (
        <section data-testid="testSidebar" className='vlx-sidebar'>
            <div className='container'>
                <div className='container-top'>
                    <h1 onClick={() => navigate('/')}>Verlof Systeem</h1>
                    <Link to={'/'}>
                        <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                        Dashboard
                    </Link>
                    <a className={`a ${active ? 'active' : ''}`} onClick={() => setActive(!active)}>
                        <FontAwesomeIcon className='icons' icon={faUserGroup} />
                        Werknemers
                        <span className={`icons-dropdown ${active ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </a>
                    <div className={`dropdown ${active ? 'active' : ''}`}>
                        <Link to={'/werknemers'} onClick={(() => setActive(''))}>Werknemers</Link>
                        <Link to={'/werknemers/add'} onClick={(() => setActive(''))}>Toevoegen</Link>
                    </div>
                    <Link to={'/planning'}>
                        <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                        Planning
                    </Link>
                </div>
                <div className='container-bot'>
                    <Link to={'/settings'}>
                        <FontAwesomeIcon className='icons' icon={faGear} />
                        Settings
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Sidebar;
