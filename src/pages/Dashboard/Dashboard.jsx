import {useNavigate} from "react-router-dom";
import Navbar from "../../components/Elements/Navbar";
import React from "react";
import {useAuth} from '../../context/AuthContext';
import Profile from "../../components/Elements/Profile";

const Dashboard = () => {
    const navigate = useNavigate();
    const {logout, profile} = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();

        const success = logout();

        if (success) {
            navigate('/login');
        }
    };

    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center p-2">
                <Profile profile={profile} onLogout={handleLogout}/>
            </div>
        </>
    )
};

export {Dashboard};