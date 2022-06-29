import React from "react";
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Beer creator</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaSignOutAlt /> Register
                    </Link>
                </li>
            </ul>
        </header>
    )
}