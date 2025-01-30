import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { use } from 'react';

const Home = () => {

    const [balance, setBalance] = useState([]);
    const [user, setUser] = useState([]);
    const [aanwezigheidsPercentage, setAanwezigheidsPercentage] = useState([]);
    const [percentage, setPercentage] = useState([]);

    useEffect(() => {
        axios.get(`https://geoprofs-backend.vacso.cloud/api/balance`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("bearer_token")}`,
                'Content-Type': 'application/json',
                Accept: "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        }).then(response => {
            setBalance(response.data);
        }).catch(error => {
            console.error('Error:', error);
        });
        setPercentage(Math.round((balance.used / balance.max) * 100));
        setAanwezigheidsPercentage(percentage);
    }, [balance]);

    return (
        <div data-testid='test-home' className='dashboard'>
            <div className='widgets'>
                <div className='widget'>
                    <h3>Ongebruikt verlof dagen</h3>
                    <p>{balance.balance + " dagen"}</p>
                </div>
                <div className='widget'>
                    <h3>Gebruikte verlof dagen</h3>
                    <p>{balance.used + " dagen"}</p>
                </div>
                <div className='widget'>
                    <h3>Max verlof dagen</h3>
                    <p>{balance.max + " dagen"}</p>
                </div>
                <div className='widget'>
                    <h3>Aanwezigheids percentage</h3>
                    <p>{aanwezigheidsPercentage + "%"}</p>
                </div>
            </div>

        </div>
    );
}

export default Home;
