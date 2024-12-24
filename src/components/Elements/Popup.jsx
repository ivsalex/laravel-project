import React from 'react';
import Button from './Button';

const Popup = ({isOpen, onClose, title, message, onConfirm, type}) => {
    if (!isOpen) return null;

    // Conditional styling based on the type of popup (error or confirmation)
    const modalStyles = type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';
    const buttonStyles = type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute bg-gray-800 opacity-70 w-full h-full" onClick={onClose}></div>

            {/* Modal content container */}
            <div className={`relative p-6 rounded-lg w-4/5 sm:w-2/3 md:w-1/3 ${modalStyles}`}>
                <h2 className="text-xl font-bold text-center">{title}</h2>
                <p className="my-4 text-center">{message}</p>
                <div className="flex justify-center space-x-4">
                    {onConfirm && type === 'confirmation' && (
                        <Button
                            text="Confirm"
                            color={buttonStyles}
                            onClick={onConfirm}
                        />
                    )}
                    <Button
                        text={type === 'error' ? 'Cancel' : 'Close'}
                        size="small"
                        color="lightblue"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default Popup;
