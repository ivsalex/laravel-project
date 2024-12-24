import React from 'react';

const Button = ({text, onClick, size = 'medium', color = 'blue', disabled = false}) => {
    const sizeClasses = {
        tiny: 'px-2 py-1 text-xs',
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    };

    const colorClasses = {
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        green: 'bg-green-500 text-white hover:bg-green-600',
        red: 'bg-red-500 text-white hover:bg-red-600',
        lightblue: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100',
        gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
    };

    const buttonClasses = `${sizeClasses[size]} ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} rounded-lg font-semibold transition-all duration-300`;

    return (
        <button onClick={onClick} className={buttonClasses} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
