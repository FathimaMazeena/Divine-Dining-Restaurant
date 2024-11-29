import React, { useContext } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom'; 
import ProfileNavbar from '../components/ProfileNavbar';
import{BrowserRouter, Routes, Route} from 'react-router-dom';




const MyProfile = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
       
        return <Navigate to="/login" replace />;
    }

    return ( 
        <div style={{"display":"flex"}}>
            <ProfileNavbar/>
            <div style={{ flex: 1, padding: "20px" }}>  {/* Content container */}
                <Outlet />  {/* This renders the component with your queries */}
            </div>

                    
        </div>
        
     );
}
 
export default MyProfile;