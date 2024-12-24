import React, {useState} from 'react';
import Card from "../../components/Elements/Card";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {handleNetworkError} from "../../utils/errorUtils";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {login, errors, setErrors} = useAuth();

    // Handle input changes
    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));

        // Clear any error related to the specific field
        setErrors(prev => ({...prev, [id]: ''}));
    };

    // Define form fields
    const fields = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            value: formData.email,
            onChange: handleChange,
        },
        {
            id: 'password',
            label: 'Password',
            type: 'password',
            value: formData.password,
            onChange: handleChange,
        }
    ];

    // Login user function
    const loginUser = async () => {
        const {email, password} = formData;
        try {
            const response = await login(email, password); // Await the login response

            if (!response.success) {
                // If login fails (no token), return false
                return response.message;
            }

        } catch (error) {
            return handleNetworkError(error);
        }
    };

    // Form validation
    const validateForm = (email, password) => {
        let validationErrors = {};

        if (!email) {
            validationErrors.email = "Email is required";
        }

        if (!password) {
            validationErrors.password = "Password is required";
        }

        // If there are validation errors, update the global error state
        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = formData;

        // Validate the form before submitting
        const formIsValid = validateForm(email, password);
        if (!formIsValid) return;

        setButtonDisabled(true);  // Disable the button during the request

        const errorMessage = await loginUser();

        if (errorMessage) {
            // Handle error response (general error)
            setErrors({general: errorMessage});
        } else {
            // If login is successful, navigate to the homepage
            navigate('/');
        }

        setButtonDisabled(false);  // Re-enable the button after the request
    };

    return (
        <>
            <Card
                title="Login"
                buttonText="Login"
                fields={fields}
                pageType="login"
                errors={errors}
                onSubmit={handleSubmit}
                buttonDisabled={buttonDisabled}
            />
        </>
    );
};

export {Login};
