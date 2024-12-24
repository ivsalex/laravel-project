import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

const AuthRedirect = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return children;
};

export default AuthRedirect;
