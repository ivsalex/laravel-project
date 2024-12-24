import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAuth} from "./AuthContext";
import axios from 'axios';

const CarContext = createContext();

// Custom hook to use the CarContext
export const useCar = () => {
    return useContext(CarContext);
};

// CarProvider component to wrap your app and provide car data
export const CarProvider = ({children}) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {authToken} = useAuth();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost/public/api/car/get-all', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    }
                });
                setCars(response.data.cars);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (authToken) fetchCars();

    }, [authToken]);

    const addCar = async (newCar) => {
        try {
            const response = await axios.post('http://localhost/public/api/car', newCar, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            setCars([...cars, response.data.car]); // Add new car to the list
        } catch (error) {
            setError(error.response.data.errors);
            console.error("Error adding car:", error);
        }
    };

    const updateCar = async (carId, updatedCar) => {
        try {
            const response = await axios.put(`http://localhost/public/api/car/${carId}`, updatedCar, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            setCars(cars.map(car => car.id === updatedCar.id ? response.data.car : car)); // Update car in the list
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    const deleteCar = async (carId) => {
        try {
            await axios.delete(`http://localhost/public/api/car/${carId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            setCars(cars.filter(car => car.id !== carId)); // Remove deleted car from the list
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <CarContext.Provider value={{cars, loading, error, addCar, updateCar, deleteCar}}>
            {children}
        </CarContext.Provider>
    );
};
