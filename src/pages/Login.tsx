import React, {SyntheticEvent, useState} from "react";
import {FaSignInAlt} from 'react-icons/fa';

export function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = (e: SyntheticEvent) => {
        setFormData((prevState) => ({
            ...prevState,
            [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value,
        }))
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Log in to enter the world of beers!</p>

            <section className="form">
                <form onSubmit={onSubmit}>
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