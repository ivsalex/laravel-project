import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "./Button";

const Card = ({title, fields, onSubmit, buttonText, pageType, errors, buttonDisabled}) => {
    const navigate = useNavigate();

    // Function to handle navigation based on the page type (login or register)
    const handleNavigate = () => {
        navigate(pageType === 'login' ? '/register' : '/login');
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-4 my-4">
            <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
            <form onSubmit={onSubmit}>
                {/* Dynamically render input fields based on the 'fields' prop */}
                {fields.map((field, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={field.required}
                            onChange={field.onChange}
                            value={field.value}
                        />
                        {/* Display field-specific error message */}
                        {errors[field.id] && (
                            <p className="text-red-500 text-sm p-1">* {errors[field.id]}</p>
                        )}
                    </div>
                ))}
                {/* Display general error if it exists */}
                {errors.general && (
                    <div className="text-red-500 text-sm mb-4 text-center" data-testid="error-message">
                        {errors.general}
                    </div>
                )}
                <div className="w-full flex justify-center">
                    <Button
                        type="submit"
                        color="blue"
                        size="medium"
                        text={buttonText}
                        disabled={buttonDisabled}
                    />
                </div>
            </form>
            <div className="text-center mt-6">
                <p className="text-sm">
                    Click{" "}
                    <span
                        onClick={handleNavigate}
                        className="text-blue-500 cursor-pointer hover:text-blue-600"
                    >
                        here
                    </span>
                    {/* Display dynamic text based on pageType */}
                    {`${pageType === 'login' ? " to register" : " to login"}`}
                </p>
            </div>
        </div>
    );
};

export default Card;
