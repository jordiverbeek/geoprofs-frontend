import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Manager = () => {
    const [werknemers, setWerknemers] = useState([]);

    useEffect(() => {
        const fetchWerknemers = async () => {
            try {
                console.log('Bearer token:', Cookies.get('bearer_token'));
                const response = await axios.get('https://geoprofs-backend.vacso.cloud/api/users', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                        'Content-Type': 'application/json',
                        Accept: "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                console.log('Response:', response.data);
                setWerknemers(response.data.users || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchWerknemers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://geoprofs-backend.vacso.cloud/api/users/${id}/delete`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
            });
            setWerknemers(werknemers.filter(werknemer => werknemer.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="manager-container">
            <div className="page-title">Manager</div>
            <div className="page-subtitle">Overzicht van medewerkers</div>
            <div className="werknemers-list">
                {werknemers.map((werknemer) => (
                    <div className="werknemer-row" key={werknemer.id}>
                        <div className="werknemer-col">
                            <div className="werknemer-name">
                                {werknemer.first_name} {werknemer.sure_name} 
                                <span className={`role-tag ${werknemer.role_slug}`}> 
                                    ({werknemer.role_slug === 'manager' ? 'Manager' : 'Werknemer'})
                                </span>
                            </div>
                            <div className="werknemer-email">{werknemer.email}</div>
                        </div>
                        <div onClick={() => handleDelete(werknemer.id)} id='Delete_button' className='werknemer-verwijder'>  
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Manager;
