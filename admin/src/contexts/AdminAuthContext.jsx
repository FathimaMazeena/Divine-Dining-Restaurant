import React, { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = Cookies.get('isLoggedIn');
        setIsLoggedIn(!!loggedIn);
    }, []);

    const login = () => {
        Cookies.set('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    // const logout = () => {
    //     Cookies.remove('isLoggedIn');
    //     //Cookies.remove('connect.sid');
    //     setIsLoggedIn(false);
    // };

    const logout = async () => {
        try {
            // Make a request to the backend logout API
            const response = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
            });
    
            if (response.ok) {
                Cookies.remove('isLoggedIn'); // Remove cookie on the frontend
                setIsLoggedIn(false); // Update state
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };
    

    return (
        <AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthProvider;
