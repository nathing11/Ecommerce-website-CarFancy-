import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();


    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
            localStorage.removeItem('token');
            localStorage.removeItem('card');
            navigate (window.location.href='/')
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <button className='nav-link' onClick={logout}>
            Logout
        </button>
    );
};

export default Logout;
