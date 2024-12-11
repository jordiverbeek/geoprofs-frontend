import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {

    return (
        <div data-testid='test-home' className='dashboard'>
            <div className='widgets'>
                <div className='widget'>
                    <h3>Aanwezigen</h3>
                    <p>17</p>
                </div>
                <div className='widget'>
                    <h3>Afwezigen</h3>
                    <p>5</p>
                </div>
                <div className='widget'>
                    <h3>ziekte percentage</h3>
                    <p>100%</p>
                </div>
                <div className='widget'>
                    <h3>Verlof uren</h3>
                    <p>23</p>
                </div>
            </div>
            <div className='content'>
            </div>

        </div>
    );
}

export default Home;
