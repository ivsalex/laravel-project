import React, {useState} from 'react';
import Button from './Button';
import {useCar} from "../../context/CarContext";

const DeleteModal = ({isOpen, carData, onClose}) => {
    const {deleteCar, error} = useCar();
    const carId = carData.id;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    if (!isOpen) return null;

    const handleDelete = (carId) => {
        deleteCar(carId);
        setIsButtonDisabled(true);

        if (!error) {
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="absolute bg-white border border-gray-300 p-6 rounded-lg w-4/5 sm:w-2/3 md:w-1/3">
                <div className="text-center mb-4 space-y-2">
                    <h3 className="text-xl">Are you sure you want to delete this car?</h3>
                    <p className="text-sm text-gray-500">ID: {carId}</p>
                </div>
                <div className="flex justify-around">
                    <Button text="Cancel"
                            onClick={onClose}
                            color="gray"/>
                    <Button text="Delete"
                            onClick={() => handleDelete(carId)}
                            color={isButtonDisabled ? 'disabled' : 'red'}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
