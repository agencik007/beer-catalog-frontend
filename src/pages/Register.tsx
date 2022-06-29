import React, {SyntheticEvent, useState} from "react";
import {FaUser} from 'react-icons/fa';

export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const {name, email, password, password2} = formData;

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