import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Verlof = () => {
     return (
          <section className='verlof'>
               <div className="header-planning">
                    <h2>Verlof</h2>
               </div>
               <div className='verlof-content'>
                    
               </div>
          </section>

     );
};

export default Verlof;
