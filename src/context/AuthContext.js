import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from "axios";
import {handleNetworkError} from "../utils/errorUtils";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!authToken) {
            setIsAuthenticated(false);
        }
        if (authToken) {
            fetchProfile();
        }

    }, [authToken]);

    // Function to fetch the user's profile from the API using the authToken
    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost/public/api/user/me', {
                headers: {Authorization: `Bearer ${authToken}`}
            });

            if (response.data.user) {
                setProfile(response.data.user);
            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Function to handle the login process (saving the token and updating state)
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost/public/api/user/login', {
                email: email,
                password: password
            });

            if (response.data.token) {
                // Store the token in localStorage and update context
                setAuthToken(response.data.token);
                setIsAuthenticated(true);  // Mark user as authenticated
            } else {
                return {error: true, message: 'Invalid credentials! Please try again.'};
            }
        } catch (error) {
            const errorMessage = handleNetworkError(error);
            setErrors({general: errorMessage});
            return {error: true, message: 'An error occurred. Please try again later.'};
        }
    };

    // Function to handle logging out (removes token and clears user data)
    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setIsAuthenticated(false);
        setProfile(null);
    };

    // Provide the authentication data and functions to the rest of the app
    return (
        <AuthContext.Provider
            value={{authToken, profile, isAuthenticated, login, logout, setProfile, errors, setErrors}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily consume the auth context in other components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
