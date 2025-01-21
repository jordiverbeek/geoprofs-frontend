import React, { useState, useEffect } from 'react';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming js-cookie is installed

// Helper function to calculate the week number
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear + (24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const Planning = () => {
    const [weeknumber, setWeeknumber] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedButton, setSelectedButton] = useState('ma-vr');
    const [users, setUsers] = useState([]); // State to hold users data
    const [agenda, setAgenda] = useState([]); // State to hold agenda data
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const currentWeek = getWeekNumber(new Date());
        setWeeknumber(currentWeek);

        // Fetch users from the API with authorization headers
        axios.get('https://geoprofs-backend.vacso.cloud/api/users', {
            headers: {
                Authorization: "Bearer " + Cookies.get("bearer_token"),
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => {
            setUsers(response.data.users); // Extracting the 'users' array
            console.log('Users fetched:', response.data.users);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            setLoading(false);
        });

        axios.get('https://geoprofs-backend.vacso.cloud/api/agenda/get', {
            headers: {
                Authorization: "Bearer " + Cookies.get("bearer_token"),
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => { 
            console.log('Agenda generated:', response.data);
            setAgenda(response.data.agenda); // Opslaan in de state
            setLoading(false); // Stop met laden
        })
        .catch(error => {
            console.error('Error generating agenda:', error);
            setLoading(false);
        });
        
        
        
    }, []);

    const changeWeekNumber = (week) => {
        setWeeknumber((prevWeek) => {
            if (week === 'previous' && prevWeek > 1) {
                return prevWeek - 1;
            } else if (week === 'next' && prevWeek < 52) {
                return prevWeek + 1;
            }
            return prevWeek;
        });
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const selectWeek = (week) => {
        setWeeknumber(week);
        setDropdownVisible(false);
    };

    const handleActive = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const renderDays = () => {
        const days = selectedButton === 'ma-vr' ? ['Ma', 'Di', 'Wo', 'Do', 'Vr'] : ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
    };

    const renderAgenda = () => {
        if (!agenda[2025]) return <div>Geen agenda beschikbaar</div>;
    
        // Haal de juiste week op (bijv. 2025, weeknumber)
        const weekData = agenda[2025][weeknumber];
        if (!weekData) return <div>Geen data voor week {weeknumber}</div>;
    
        // Stel de juiste dagenreeks in
        const selectedDays = selectedButton === 'ma-vr' 
            ? ['2025-01-06', '2025-01-07', '2025-01-08', '2025-01-09', '2025-01-10'] 
            : ['2025-01-06', '2025-01-07', '2025-01-08', '2025-01-09', '2025-01-10', '2025-01-11', '2025-01-12'];
    
        return selectedDays.map((date) => (
            <div key={date} className="agenda-row">
                <div className="date">{date}</div>
                <div className="tasks">
                    {weekData[date] && weekData[date].length > 0 ? (
                        weekData[date].map((task, index) => (
                            <div key={index} className="task-item">
                                {task}
                            </div>
                        ))
                    ) : (
                        <div className="no-tasks">Geen taken</div>
                    )}
                </div>
            </div>
        ));
    };
    
    
        

    const renderUsers = () => {
        return users.map(user => (
            <div key={user.id} className="user-row">
                <div className="user-name">{user.first_name + " " + user.sure_name}</div>
                <div className="user-email">{ " " + user.email}</div>
                {/* Add more user details as needed */}
            </div>
        ));
    };

    return (
        <div className='container-planning'>
            <div className='header-planning'>
                <h2>Planning</h2>
            </div>
            <div className='planning-content-header'>
                <div className='planning-nav'>
                    <button className='planning-nav-item small-btn' onClick={() => changeWeekNumber('previous')}>
                        <FontAwesomeIcon icon={faLessThan} />
                    </button>
                    <div className='planning-nav-item dropdown-container' onClick={toggleDropdown}>
                        Week {weeknumber} <FontAwesomeIcon icon={faChevronDown} />
                        {dropdownVisible && (
                            <div className='dropdown-menu'>
                                {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
                                    <div
                                        key={week}
                                        className='dropdown-item'
                                        onClick={() => selectWeek(week)}
                                    >
                                        Week {week}
                                    </div>
                                )).reduce((rows, item, index) => {
                                    if (index % 4 === 0) rows.push([]);
                                    rows[rows.length - 1].push(item);
                                    return rows;
                                }, []).map((row, index) => (
                                    <div key={index} className='dropdown-row'>
                                        {row}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className='planning-nav-item small-btn' onClick={() => changeWeekNumber('next')}>
                        <FontAwesomeIcon icon={faGreaterThan} />
                    </button>
                    <hr className='plan-Spacing' />
                    <div 
                        className={selectedButton === 'ma-vr' ? 'planning-nav-days active' : 'planning-nav-days'}
                        onClick={() => handleActive('ma-vr')}
                    >
                        Ma - Vr
                    </div>
                    <div 
                        className={selectedButton === 'ma-zo' ? 'planning-nav-days active' : 'planning-nav-days'}
                        onClick={() => handleActive('ma-zo')}
                    >
                        Ma - Zo
                    </div>
                </div>
                <div className='planning-content'>
                    <div className='header-row'>
                        <div className='Werknemer-tekst'>Werknemers</div>
                        {renderDays()}
                    </div>
                    {loading ? <div>Loading...</div> : renderAgenda()}
                    {/* {loading ? <div>Loading...</div> : renderUsers()} */}
                </div>
            </div>
        </div>
    );
};

export default Planning;
