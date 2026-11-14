import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FieldError } from '../components/FieldError';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import { register } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';
import { AppDispatch, RootState } from 'src/app/store';
import { useTranslation } from 'react-i18next';

const MIN_PASSWORD_LENGTH = 8;

export function Register() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state: RootState) => state.auth
	);

	type Field = 'name' | 'email' | 'password' | 'password2';
	const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
	const [serverError, setServerError] = useState('');

	useEffect(() => {
		if (isError) {
			setServerError(String(message || t('register.failed')));
		}

		if (user) {
			navigate('/');
		} else if (isSuccess) {
			// Account created, waiting for email verification
			navigate('/login');
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

		const next: Partial<Record<Field, string>> = {};
		if (!name.trim()) next.name = t('register.errors.name');
		if (!email.trim()) next.email = t('register.errors.email');
		if (password.length < MIN_PASSWORD_LENGTH)
			next.password = t('register.errors.password', { count: MIN_PASSWORD_LENGTH });
		if (password2 !== password) next.password2 = t('register.errors.password2');
		setErrors(next);

		const firstInvalid = (['name', 'email', 'password', 'password2'] as Field[]).find(
			(field) => next[field]
		);
		if (firstInvalid) {
			document.getElementById(firstInvalid)?.focus();
			return;
		}

		dispatch(register({ name, email, password }));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="auth">
			<header className="auth__head">
				<h1>{t('register.title')}</h1>
				<p>{t('register.lead')}</p>
			</header>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label className="field-label" htmlFor="name">
							{t('common.name')}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							aria-invalid={errors.name ? true : undefined}
							aria-describedby={errors.name ? 'name-error' : undefined}
							autoComplete="name"
							value={name}
							onChange={onChange}
						/>
						<FieldError id="name-error" message={errors.name} />
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="email">
							{t('common.email')}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							aria-invalid={errors.email ? true : undefined}
							aria-describedby={errors.email ? 'email-error' : undefined}
							autoComplete="email"
							value={email}
							onChange={onChange}
						/>
						<FieldError id="email-error" message={errors.email} />
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="password">
							{t('common.password')}
						</label>
						<input
							type="password"
							id="password"
							name="password"
							aria-invalid={errors.password ? true : undefined}
							aria-describedby={errors.password ? 'password-error' : undefined}
							autoComplete="new-password"
							value={password}
							onChange={onChange}
						/>
						<FieldError id="password-error" message={errors.password} />
						{errors.password ? null : <span className="field-hint">{t('common.passwordHint', { count: MIN_PASSWORD_LENGTH })}</span>}
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="password2">
							{t('register.confirmPassword')}
						</label>
						<input
							type="password"
							id="password2"
							name="password2"
							aria-invalid={errors.password2 ? true : undefined}
							aria-describedby={errors.password2 ? 'password2-error' : undefined}
							autoComplete="new-password"
							value={password2}
							onChange={onChange}
						/>
						<FieldError id="password2-error" message={errors.password2} />
					</div>
					<div className="form-group">
						<label className="check" htmlFor="adult">
							<input
								type="checkbox"
								id="adult"
								name="adult"
								onChange={onChange}
								required={true}
							/>
							{t('register.adult')}
						</label>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							{t('register.submit')}
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
			</section>
			<p className="auth__foot">
				{t('register.haveAccount')} <Link to="/login">{t('register.logIn')}</Link>
			</p>
		</section>
	);
}
