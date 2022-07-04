import React, {SyntheticEvent, useEffect, useState} from "react";
import {FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';
import {Spinner} from '../components/Spinner';

export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const {name, email, password, password2} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e: SyntheticEvent) => {
        setFormData((prevState) => ({
            ...prevState,
            [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value,
        }))
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match.');
        } else {
            const userData = {
                name,
                email,
                password
            }

            toast.success('Successfully registered!');
            // @ts-ignore
            dispatch(register(userData));
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account.</p>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm your password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adult">
                            Please confirm the checkbox below that you are over 18 years old.
                        </label>
                        <input
                            type="checkbox"
                            className="form-control"
                            name="adult"
                            onChange={onChange}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block">
                            Submit
                        </button>
                    </div>

                </form>
            </section>
        </section>
    </>
}