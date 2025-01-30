import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Manager = () => {
   return (
        <div>
             <h1>Manager</h1>
             <p>Here you can manage the users.</p>
        </div>
   );
};

export default Manager;
