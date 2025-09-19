import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';



const Private = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
};
    
    return (
        <>
        <div>
            <h2>Bienvenido, {user?.email}!</h2>
            <p>Esta es una página privada a la que solo los usuarios autenticados pueden acceder.</p>
        </div>
        <span>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </span>
        </>
    );
};

export default Private;