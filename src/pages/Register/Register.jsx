import React, {useState} from 'react';
import Card from "../../components/Elements/Card";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const fields = [
        {
            id: 'email',
            label: 'Email *',
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
        },
        {
            id: 'password',
            label: 'Password *',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
        },
        {
            id: 'firstName',
            label: 'First Name',
            type: 'text',
            value: firstName,
            onChange: (e) => setFirstName(e.target.value),
            required: false
        },
        {
            id: 'lastName',
            label: 'Last Name',
            type: 'text',
            value: lastName,
            onChange: (e) => setLastName(e.target.value),
            required: false
        },
        {
            id: 'phone',
            label: 'Phone Number',
            type: 'text',
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            required: false
        },
        {
            id: 'referralCode',
            label: 'Referral Code',
            type: 'text',
            value: referralCode,
            onChange: (e) => setReferralCode(e.target.value),
            required: false
        }
    ];

    // Validation function to check the fields
    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must have at least 6 characters';
        }

        // Optional validations
        if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
            newErrors.phone = 'Phone number is not valid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerUser = async (email, password, firstName, lastName, phone, referralCode) => {
        try {
            const requestBody = {
                email,
                password,
            };

            if (firstName) requestBody.firstName = firstName;
            if (lastName) requestBody.lastName = lastName;
            if (phone) requestBody.phone = phone;
            if (referralCode) requestBody.referralCode = referralCode;

            const response = await axios.post('http://localhost/public/api/user/register', requestBody);

            if (response.data.user) {
                console.log('Register done!');
                return true;
            } else {
                console.log('Register failed!');
                return false;
            }

        } catch (error) {
            console.error('Register error:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submitting
        const isValid = validate();
        if (isValid) {
            const success = await registerUser(email, password, firstName, lastName, phone, referralCode);
            if (success) {
                navigate('/');
            } else {
                alert('Register failed!');
            }
        }
    };

    // Disable button if there are validation errors or required fields are empty
    const isButtonDisabled = !email || !password || errors.email || errors.password;

    return (
        <Card
            title="Register"
            buttonText="Register"
            fields={fields}
            pageType="register"
            onSubmit={handleSubmit}
            errors={errors}
            buttonDisabled={isButtonDisabled}
        />
    );
};

export {Register};
