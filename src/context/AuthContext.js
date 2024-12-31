import React, {createContext, useState, useEffect, useContext, useCallback} from 'react';
import axios from "axios";
import {handleNetworkError} from "../utils/errorUtils";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState({});

    // Function to fetch the user's profile from the API using the authToken
    const fetchProfile = useCallback(async () => {
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
    }, [authToken]);

    useEffect(() => {
        if (!authToken) {
            setIsAuthenticated(false);
        }
        if (authToken) {
            fetchProfile();
        }
    }, [authToken, fetchProfile]);

    // Function to handle the login process (saving the token and updating state)
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost/public/api/user/login', {
                email: email,
                password: password
            });

            if (response.data.token) {
                // Store the token in localStorage and update the state
                localStorage.setItem('token', response.data.token); // Store the token in localStorage
                setAuthToken(response.data.token);  // Update the authToken state
                setIsAuthenticated(true);  // Mark the user as authenticated
                return response;  // Return response with the token
            } else {
                return {error: true, message: "Invalid credentials"};
            }
        } catch (error) {
            const errorMessage = handleNetworkError(error);
            setErrors({general: errorMessage});
            return {error: true, message: errorMessage};
        }
    };

    // Function to handle logging out (removes token and clears user data)
    const logout = () => {
        localStorage.removeItem('token');  // Remove the token from localStorage
        setAuthToken(null);  // Reset the authToken state
        setIsAuthenticated(false);  // Mark the user as logged out
        setProfile(null);  // Clear the user profile
    };

    // Provide the authentication data and functions to the rest of the app
    return (
        <AuthContext.Provider
            value={{authToken, profile, isAuthenticated, login, logout, setProfile, errors, setErrors}}
        >
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
