import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import { login } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';
import { UserEntity } from 'types';
import { AppDispatch, RootState } from 'src/app/store';

export function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state: RootState) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e: SyntheticEvent) => {
		setFormData((prevState) => ({
			...prevState,
			[(e.target as HTMLTextAreaElement).name]: (
				e.target as HTMLTextAreaElement
			).value,
		}));
	};

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		const userData: UserEntity = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
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
								required={true}
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
								required={true}
								value={password}
								placeholder="Enter your password"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-block">
								Submit
							</button>
						</div>
					</form>
				</section>
			</section>
		</>
	);
}
