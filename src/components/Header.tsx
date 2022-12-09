import React from "react";
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {IoIosBeer} from 'react-icons/io';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {reset} from "../features/auth/authSlice";
import {logout} from "../features/auth/authService";
import { AppDispatch, RootState } from "src/app/store";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const {user} = useSelector((state: RootState) => state.auth);

    const onLogout = () => {
        dispatch(logout(user as unknown as string));
        dispatch(reset);
        navigate('/');
    }

    function toCreateBeerForm() {
        navigate('/create');
    }

    function toUserBeers() {
        navigate('/user');
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Welcome to the world of beers!</Link>
            </div>
            <ul>
                {user ? (
                    <>
                        <li>
                            <button className='btn' onClick={toCreateBeerForm}>
                                <IoIosBeer /> Create beer
                            </button>
                        </li>
                        <li>
                            <button className='btn' onClick={toUserBeers}>
                                <IoIosBeer /> Your Beers
                            </button>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (<>
                    <li>
                        <Link to='/login'>
                            <button className="btn">
                                <FaSignInAlt /> Login
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <button className='btn'>
                                <FaSignOutAlt /> Register
                            </button>
                        </Link>
                    </li>
                </>)}

            </ul>
        </header>
    )
}