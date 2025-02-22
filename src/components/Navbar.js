import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
           <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="authentication">Authetication</Link>
                </li>
            </ul>
           </nav>
        </div>
    );
};

export default Navbar;