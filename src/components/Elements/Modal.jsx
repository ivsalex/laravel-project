import React from 'react';
import CarForm from './CarForm';
import Button from "./Button";

const Modal = ({actionType, carData, onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white border border-gray-300 p-6 rounded-xl w-4/5 sm:w-2/3 md:w-1/3">
                <div className="mb-4 flex justify-end">
                    <Button text="X" size="tiny" onClick={onClose}/>
                </div>
                <CarForm
                    actionType={actionType}
                    carData={carData}
                    onClose={onClose}
                />
            </div>
        </div>
    );
};

export default Modal;
