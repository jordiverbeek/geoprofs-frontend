import React, { useState, useEffect } from 'react';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Planning = () => {
    const [token, setToken] = useState('');

    return ( 
        <div className='container-planning'>
            <div className='header-planning'>
                <h2>Planning</h2>
            </div>
            <div className='planning'>
                <div className='planning-nav'>
                    <div className='planning-nav-item'> <FontAwesomeIcon icon={faLessThan} /> </div>
                    <div className='planning-nav-item'> Week 40 </div>
                    <div className='planning-nav-item'> <FontAwesomeIcon icon={faGreaterThan} /> </div>
                </div>
                <div className='planning-content'>
                    
                </div>
            </div>
        </div>
    );
}

export default Planning;
