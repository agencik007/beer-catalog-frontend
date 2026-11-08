import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FaGithub, FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import { login, signInWithProvider } from '../features/auth/authService';
import { oauthProviders } from '../lib/authClient';
import { Spinner } from '../components/Spinner';
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

		dispatch(login({ email, password }));
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
					<p>
						<Link to="/forgot-password">Forgot your password?</Link>
					</p>
					{oauthProviders.length > 0 && (
						<div className="form-group">
							{oauthProviders.includes('google') && (
								<button
									type="button"
									className="btn btn-block"
									onClick={() => signInWithProvider('google')}
								>
									<FaGoogle /> Continue with Google
								</button>
							)}
							{oauthProviders.includes('github') && (
								<button
									type="button"
									className="btn btn-block"
									onClick={() => signInWithProvider('github')}
								>
									<FaGithub /> Continue with GitHub
								</button>
							)}
						</div>
					)}
				</section>
			</section>
		</>
	);
}
