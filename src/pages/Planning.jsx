import React, { useState, useEffect } from 'react';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

// Helper functions
const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear + (24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000);
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getDatesInWeek = (year, week, includeWeekend = false) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7 - firstDayOfYear.getDay();
    const startOfWeek = new Date(year, 0, daysOffset + 1);
    const days = Array.from({ length: includeWeekend ? 7 : 5 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date.toISOString().split('T')[0];
    });
    return days;
};

const Planning = () => {
    const [weeknumber, setWeeknumber] = useState(getWeekNumber(new Date()));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [yearDropdownVisible, setYearDropdownVisible] = useState(false);
    const [selectedButton, setSelectedButton] = useState('ma-vr');
    const [agenda, setAgenda] = useState({}); // Agenda data grouped by year and week
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersResponse, agendaResponse] = await Promise.all([
                    axios.get('https://geoprofs-backend.vacso.cloud/api/users', {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('bearer_token')}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                    axios.get('https://geoprofs-backend.vacso.cloud/api/agenda/get', {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('bearer_token')}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                ]);

                console.log('Users fetched:', usersResponse.data.users);
                console.log('Agenda fetched:', agendaResponse.data.agenda);

                setAgenda(agendaResponse.data.agenda);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const changeWeekNumber = (direction) => {
        setWeeknumber((prev) => {
            if (direction === 'previous') return prev > 1 ? prev - 1 : 52;
            if (direction === 'next') return prev < 52 ? prev + 1 : 1;
            return prev;
        });
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleYearDropdown = () => {
        setYearDropdownVisible(!yearDropdownVisible);
    };

    const handleActive = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const renderAgenda = () => {
        if (!agenda[selectedYear]) return <div>Geen agenda beschikbaar voor {selectedYear}</div>;
        const weekData = agenda[selectedYear][weeknumber];
        if (!weekData) return <div>Geen data voor week {weeknumber} in {selectedYear}</div>;

        const dates = getDatesInWeek(selectedYear, weeknumber, selectedButton === 'ma-zo');
        return dates.map((date) => (
            <div key={date} className="agenda-row">
                <div className="date">{date}</div>
                <div className="tasks">
                    {weekData[date] && weekData[date].length > 0 ? (
                        weekData[date].map((task, index) => (
                            <div key={index} className="task-item">
                                {JSON.stringify(task)}
                            </div>
                        ))
                    ) : (
                        <div className="no-tasks">Geen data beschikbaar</div>
                    )}
                </div>
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
                                {Array.from({ length: 52 }, (_, i) => i + 1).reduce((rows, week, index) => {
                                    if (index % 4 === 0) rows.push([]);
                                    rows[rows.length - 1].push(
                                        <div
                                            key={week}
                                            className='dropdown-item'
                                            onClick={() => setWeeknumber(week)}
                                        >
                                            Week {week}
                                        </div>
                                    );
                                    return rows;
                                }, []).map((row, index) => (
                                    <div key={index} className='dropdown-row'>
                                        {row}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='planning-nav-item dropdown-container' onClick={toggleYearDropdown}>
                        Jaar {selectedYear} <FontAwesomeIcon icon={faChevronDown} />
                        {yearDropdownVisible && (
                            <div className='dropdown-menu'>
                                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                                    <div
                                        key={year}
                                        className='dropdown-item'
                                        onClick={() => setSelectedYear(year)}
                                    >
                                        {year}
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
                    {loading ? <div>Loading...</div> : renderAgenda()}
                </div>
            </div>
        </div>
    );
};

export default Planning;
