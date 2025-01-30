import React, { useState, useEffect } from "react";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";

const getWeekNumber = (date) => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const diff = target - firstThursday;
    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
};

const getDatesInWeek = (year, week, includeWeekend = false) => {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = simple.getDay();
    const ISOWeekStart = simple;
    if (dayOfWeek <= 4) {
        ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 2);
    } else {
        ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return Array.from({ length: includeWeekend ? 7 : 5 }, (_, i) => {
        const date = new Date(ISOWeekStart);
        date.setDate(ISOWeekStart.getDate() + i);
        return date.toISOString().split("T")[0];
    });
};

const getDayAbbreviation = (() => {
    const formatter = new Intl.DateTimeFormat("nl-NL", { weekday: "short" });
    const cache = new Map();

    return (dateString) => {
        if (cache.has(dateString)) {
            return cache.get(dateString);
        }
        const date = new Date(dateString);
        const abbreviation = formatter.format(date).slice(0, 2).toUpperCase();
        cache.set(dateString, abbreviation);
        return abbreviation;
    };
})();

const Planning = () => {
    const [weeknumber, setWeeknumber] = useState(getWeekNumber(new Date()));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [yearDropdownVisible, setYearDropdownVisible] = useState(false);
    const [selectedButton, setSelectedButton] = useState("ma-vr");
    const [agenda, setAgenda] = useState({});
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [weekData, setWeekData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersResponse, agendaResponse] = await Promise.all([
                    axios.get("https://geoprofs-backend.vacso.cloud/api/users", {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }),
                    axios.get("https://geoprofs-backend.vacso.cloud/api/agenda/get", {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }),
                ]);

                setAgenda(agendaResponse.data.agenda);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (Object.keys(agenda).length > 0) {
            const newWeekData = agenda[selectedYear]?.[weeknumber];
            if (newWeekData) {
                const usersSet = new Set(users);
                Object.entries(newWeekData).forEach(([date, userEntries]) => {
                    Object.entries(userEntries).forEach(([userId, userDetails]) => {
                        const fullName = userDetails.user.first_name + " " + userDetails.user.sure_name;
                        usersSet.add(fullName);
                    });
                });
                const newUsers = Array.from(usersSet);
                setUsers(newUsers);
                setWeekData(newWeekData);
            }
        }
    }, [agenda, selectedYear, weeknumber]);



    const changeWeekNumber = (direction) => {
        setWeeknumber((prev) => {
            if (direction === "previous") return prev > 1 ? prev - 1 : 52;
            if (direction === "next") return prev < 52 ? prev + 1 : 1;
            return prev;
        });
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleActive = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const renderAgenda = () => {
        if (!weekData) {
            return <div>Geen data voor week {weeknumber} in {selectedYear}</div>;
        }
    
        const dates = getDatesInWeek(selectedYear, weeknumber, selectedButton === "ma-zo");
    
        console.log(weekData);
        return (
            <>
                <div className="user-container">
                    <div className={selectedButton === "ma-zo" ? "planning-header-ma-zo" : "planning-header"}>Werknemers</div>
                    {users.map((user) => (
                        <div key={user} className="task">
                            {user}
                        </div>
                    ))}
                </div>
    
                {dates.map((date) => {
                    const dateData = weekData[date];
                    const dayAbbreviation = getDayAbbreviation(date);
    
                    return (
                        <div key={date} className="planning-container">
                            <div className="planning-header-dates">
                                <div className="planning-date">
                                    {dayAbbreviation} - {date}
                                </div>
                            </div>
                            <div className="tasks">
                                {users.map((user) => {
                                    const userTask = dateData ? Object.values(dateData).find((task) => task.user.first_name + " " + task.user.sure_name === user) : null;
    
                                    return (
                                        <div key={user} className="task">
                                            {userTask ? (
                                                userTask.morning === userTask.afternoon ? (
                                                    <div className="task-whole-day">{userTask.morning}</div>
                                                ) : (
                                                    <>
                                                        {userTask.afternoon === 'aanwezig' ? (
                                                            <>
                                                                <div className="task-user-morning">
                                                                    {userTask.morning === 'aanwezig' ? <></> : userTask.morning}
                                                                </div>
                                                                <div className="task-user-afternoon"></div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {userTask.morning === 'aanwezig'}
                                                                <div className="task-user-morning"></div>
                                                                <div className="task-user-afternoon">{userTask.afternoon}</div>
                                                            </>
                                                        )}
                                                    </>
                                                )
                                            ) : (
                                                <p className="planning-fields" key={user}></p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };
    

    return (
        <div className="container-planning">
            <div className="header-planning">
                <h2>Planning</h2>
            </div>
            <div className="planning-content-header">
                <div className="planning-nav">
                    <button className="planning-nav-item small-btn" onClick={() => changeWeekNumber("previous")}>
                        <FontAwesomeIcon icon={faLessThan} />
                    </button>
                    <div className="planning-nav-item dropdown-container" onClick={toggleDropdown}>
                        Week {weeknumber} <FontAwesomeIcon icon={faChevronDown} />
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
                                    <div key={week} className="dropdown-item" onClick={() => setWeeknumber(week)}>
                                        Week {week}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="planning-nav-item small-btn" onClick={() => changeWeekNumber("next")}>
                        <FontAwesomeIcon icon={faGreaterThan} />
                    </button>
                    <div
                        className={selectedButton === "ma-vr" ? "planning-nav-days active" : "planning-nav-days"}
                        onClick={() => handleActive("ma-vr")}
                    >
                        Ma - Vr
                    </div>
                    <div
                        className={selectedButton === "ma-zo" ? "planning-nav-days active" : "planning-nav-days"}
                        onClick={() => handleActive("ma-zo")}
                    >
                        Ma - Zo
                    </div>
                </div>
                <div id="planning-content" className="planning-content">{loading ? <div>Loading...</div> : renderAgenda()}</div>
            </div>
        </div>
    );
};

export default Planning;
