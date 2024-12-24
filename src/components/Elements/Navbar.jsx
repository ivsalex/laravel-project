import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-6">
            <div className="flex justify-center items-center">
                <ul className="flex space-x-6 font-bold">
                    <li>
                        <Link to="/" className="hover:text-gray-300">HOME</Link>
                    </li>
                    <li>
                        <Link to="/cars" className="hover:text-gray-300">CARS</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-300">DASHBOARD</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
