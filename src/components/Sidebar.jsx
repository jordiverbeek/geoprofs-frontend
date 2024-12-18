import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserGroup, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';


const Sidebar = () => {
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('bearer_token', { path: '' }) 
        if (Cookies.get('bearer_token') === undefined) {
            console.log('Cookie removed');
            console.log('logging out');
        }
    };

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
                        <Link to={'/'} onClick={() => handleActive('dashboard')}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Dashboard
                        </Link>
                        <Link to={'/werknemers'} onClick={() => handleActive('werknemers')}>
                            <FontAwesomeIcon className='icons' icon={faUserGroup} />
                            Werknemers
                        </Link>
                        <Link to={'/planning'} onClick={() => handleActive('planning')}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Planning
                        </Link>
                        <Link onClick={() => { handleActive('verlof'); toggleModal(); }}>
                            <FontAwesomeIcon className='icons' icon={faCalendarDays} />
                            Verlof aanvragen
                        </Link>
                    </div>
                    <div className='container-bot'>
                        <Link onClick={() => handleLogout()}>
                            <FontAwesomeIcon className='icons' icon={faSignOut} />
                            Logout
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
