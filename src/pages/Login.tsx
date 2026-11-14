import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import { login, signInWithProvider } from '../features/auth/authService';
import { oauthProviders } from '../lib/authClient';
import { Spinner } from '../components/Spinner';
import { AppDispatch, RootState } from 'src/app/store';
import { useTranslation } from 'react-i18next';

export function Login() {
	const { t } = useTranslation();
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
	const [serverError, setServerError] = useState('');

	useEffect(() => {
		if (isError) {
			setServerError(String(message || t('login.failed')));
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch, t]);

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
		setServerError('');
		dispatch(login({ email, password }));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="auth">
			<header className="auth__head">
				<h1>{t('login.title')}</h1>
				<p>{t('login.lead')}</p>
			</header>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label className="field-label" htmlFor="email">
							{t('common.email')}
						</label>
						<input
							type="email"
							id="email"
							required={true}
							name="email"
							autoComplete="email"
							value={email}
							placeholder={t('common.emailPlaceholder')}
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="password">
							{t('common.password')}
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required={true}
							autoComplete="current-password"
							value={password}
							onChange={onChange}
						/>
						<Link to="/forgot-password" className="field-hint">
							{t('login.forgot')}
						</Link>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							{t('login.submit')}
						</button>
					</div>
					<p
						className={`form__status${serverError ? ' form__status--error' : ''}`}
						role="status"
						aria-live="polite"
					>
						{serverError}
					</p>
				</form>
				{oauthProviders.length > 0 && (
					<div className="oauth">
						{oauthProviders.includes('google') && (
							<button
								type="button"
								className="btn btn--ghost btn-block"
								onClick={() => signInWithProvider('google')}
							>
								<FaGoogle aria-hidden="true" /> {t('login.google')}
							</button>
						)}
						{oauthProviders.includes('github') && (
							<button
								type="button"
								className="btn btn--ghost btn-block"
								onClick={() => signInWithProvider('github')}
							>
								<FaGithub aria-hidden="true" /> {t('login.github')}
							</button>
						)}
					</div>
				)}
			</section>
			<p className="auth__foot">
				{t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
			</p>
		</section>
	);
}
