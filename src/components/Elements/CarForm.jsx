import React, {useState, useEffect} from 'react';
import Button from "./Button";
import {useCar} from "../../context/CarContext";

const CarForm = ({actionType, carData, onClose}) => {
    const bodyTypeOptions = ['sedan', 'suv', 'hatchback'];
    const {addCar, updateCar, error} = useCar();

    // State to manage form data (vin, brand, model, year, and body type)
    const [formData, setFormData] = useState({
        vin: '',
        brand: '',
        model: '',
        year: '',
        body_type: '',
    });

    const [errors, setErrors] = useState({
        vin: false,
        brand: false,
        model: false,
        year: false,
        body_type: false,
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // To disable the button after click

    // useEffect to pre-fill the form if the action type is 'Update' and carData is provided
    useEffect(() => {
        if (actionType === 'Update' && carData) {
            setFormData({
                vin: carData.vin,
                brand: carData.brand,
                model: carData.model,
                year: carData.year,
                body_type: carData.body_type,
            });
        }
    }, [actionType, carData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Reset error when the user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === '',
        }));
    };

    const validateForm = () => {
        // Check if any field is empty
        const newErrors = {
            vin: formData.vin.trim() === '',
            brand: formData.brand.trim() === '',
            model: formData.model.trim() === '',
            year: formData.year.trim() === '',
            body_type: formData.body_type.trim() === '',
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm() || error) {
            return
        }

        try {
            if (actionType === 'Add') {
                await addCar(formData);
            } else if (actionType === 'Update') {
                await updateCar(carData.id, formData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsButtonDisabled(false);
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-2">
                {/* VIN Field */}
                <div className="flex flex-col text-base">
                    <label htmlFor="vin" className="mx-1 text-gray-500">VIN:</label>
                    <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        className={`w-full border ${errors.vin ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        placeholder="VIN"
                        onChange={handleChange}
                        required
                    />
                    {errors.vin && <p className="text-red-500 text-sm">VIN is required</p>}
                    {error?.vin && <p className="text-red-500 text-sm">{error.vin[0]}</p>}
                </div>

                {/* Brand Field */}
                <div>
                    <label htmlFor="brand" className="mx-1 text-gray-500">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        className={`w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        placeholder="Brand"
                        onChange={handleChange}
                        required
                    />
                    {errors.brand && <p className="text-red-500 text-sm">Brand is required</p>}
                </div>

                {/* Model Field */}
                <div>
                    <label htmlFor="model" className="mx-1 text-gray-500">Model:</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        className={`w-full border ${errors.model ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        placeholder="Model"
                        onChange={handleChange}
                        required
                    />
                    {errors.model && <p className="text-red-500 text-sm">Model is required</p>}
                </div>

                {/* Year Field */}
                <div>
                    <label htmlFor="year" className="mx-1 text-gray-500">Year:</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        className={`w-full border ${errors.year ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        placeholder="Year"
                        onChange={handleChange}
                        required
                    />
                    {errors.year && <p className="text-red-500 text-sm">Year is required</p>}
                    {error?.year && <p className="text-red-500 text-sm">{error.year[0]}</p>}
                </div>

                {/* Body Type Field */}
                <div>
                    <label htmlFor="body_type" className="mx-1 text-gray-500">Body Type:</label>
                    <select
                        name="body_type"
                        value={formData.body_type}
                        onChange={handleChange}
                        className={`w-full border ${errors.body_type ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        required
                    >
                        {bodyTypeOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.body_type && <p className="text-red-500 text-sm">Body Type is required</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button
                        color="blue"
                        text={actionType === "Add" ? "Add Car" : "Update Car"}
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                    />
                </div>
            </div>
        </form>
    );
};

export default CarForm;
