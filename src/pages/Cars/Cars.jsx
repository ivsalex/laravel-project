import React, {useState} from 'react';
import Table from "../../components/Elements/Table";
import Navbar from "../../components/Elements/Navbar";
import {useCar} from '../../context/CarContext';  // Import the useCar hook
import Button from "../../components/Elements/Button";
import Modal from "../../components/Elements/Modal";
import DeleteModal from "../../components/Elements/DeleteModal";

const Cars = () => {
    const {cars, loading, error} = useCar(); // Use the useCar hook
    const [modal, setModal] = useState({
        isOpen: false,
        type: "",
        selectedCar: null,
    });

    const columns = [
        {Header: 'ID', accessor: 'id'},
        {Header: 'VIN', accessor: 'vin'},
        {Header: 'Brand', accessor: 'brand'},
        {Header: 'Model', accessor: 'model'},
        {Header: 'Year', accessor: 'year'},
        {Header: 'Body', accessor: 'body_type'},
        {Header: 'Owner', accessor: 'owner_id'},
        {Header: 'Age', accessor: 'age'},
    ];

    const handleModal = (type, car = null) => {
        setModal({
            isOpen: true,
            type: type,
            selectedCar: car,
        });
    };

    const closeModal = () => {
        setModal({
            isOpen: false,
            type: "",
            selectedCar: null,
        });
    };

    return (
        <>
            <Navbar/>
            <div className="flex justify-end p-2">
                <Button size="small" text="Add Car" onClick={() => handleModal("Add")}/>
            </div>

            {loading ? (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={cars}
                    onEdit={(type, car) => handleModal("Update", car)}
                    onDelete={(type, car) => handleModal("Delete", car)}
                />
            )}

            {error && <p>{error.message}</p>}

            {/* Modal for Add or Update */}
            {modal.isOpen && modal.type !== "Delete" && (
                <Modal
                    actionType={modal.type}
                    carData={modal.selectedCar}
                    onClose={closeModal}
                />
            )}
            {/* Delete Modal */}
            {modal.isOpen && modal.type === "Delete" && (
                <DeleteModal
                    isOpen={modal.isOpen}
                    carData={modal.selectedCar}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export {Cars}
