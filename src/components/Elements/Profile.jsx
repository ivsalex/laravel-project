import React from 'react';
import Button from "../../components/Elements/Button"; // Assuming you have a Button component

const Profile = ({profile, onLogout}) => {
    if (!profile) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>

            <div className="space-y-4">
                <p><strong className="font-medium">Name:</strong> {profile.first_name} {profile.last_name}</p>
                <p><strong className="font-medium">Email:</strong> {profile.email}</p>
                <p><strong className="font-medium">Phone:</strong> {profile.phone || 'N/A'}</p>
                <p><strong className="font-medium">Referral Code:</strong> {profile.referralCode || 'N/A'}</p>
            </div>

            <div className="flex justify-center mt-6">
                <Button size="small" text="Logout" onClick={onLogout}/>
            </div>
        </div>
    );
};

export default Profile;
