import React from "react";
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";

export function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state: any) => state.auth);

    const onLogout = () => {
        // @ts-ignore
        dispatch(logout());
        dispatch(reset);
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Welcome to the world of beers!</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (<>
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
                </>)}

            </ul>
        </header>
    )
}