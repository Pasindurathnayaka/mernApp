import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {

    // Check if the user is logged in (you can modify this check according to your authentication logic)
    const isLoggedIn = localStorage.getItem('token');

    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;