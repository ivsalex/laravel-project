import React from 'react';
import Button from "./Button";

const Table = ({columns, data, onEdit, onDelete, dataTestId}) => {
    return (
        <table className={"min-w-full table-auto border-collapse border border-gray-300"} data-testid={dataTestId}>
            <thead>
            <tr className="bg-gray-100">
                {columns.map((column, index) => (
                    <th key={index} className="border border-gray-300 p-2 text-center">
                        {column.Header}
                    </th>
                ))}
                <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr>
                    <td colSpan={columns.length} className="border p-2 text-center">
                        No data available
                    </td>
                </tr>
            ) : (
                data.map((car, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className="border border-gray-300 p-2 text-center">
                                {car[column.accessor]}
                            </td>
                        ))}
                        <td className="border border-gray-300 p-2 text-center space-x-1">
                            <Button size="small" text="Edit" color="blue" onClick={() => onEdit("Update", car)}/>
                            <Button size="small" text="Delete" color="red" onClick={() => onDelete("Delete", car)}/>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default Table;

