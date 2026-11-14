import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';
import { FieldError } from '../components/FieldError';
import { useTranslation } from 'react-i18next';

const MIN_PASSWORD_LENGTH = 8;

export function ResetPassword() {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const token = searchParams.get('token');
	const error = searchParams.get('error');

	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ password?: string; password2?: string }>({});
	const [serverError, setServerError] = useState('');

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setServerError('');
		const next: { password?: string; password2?: string } = {};
		if (password.length < MIN_PASSWORD_LENGTH) {
			next.password = t('register.errors.password', { count: MIN_PASSWORD_LENGTH });
		}
		if (password2 !== password) {
			next.password2 = t('register.errors.password2');
		}
		setErrors(next);
		if (next.password || next.password2) {
			document.getElementById(next.password ? 'password' : 'password2')?.focus();
			return;
		}

		setIsLoading(true);
		try {
			await resetPassword(token!, password);
			toast.success(t('reset.changed'));
			navigate('/login', { replace: true });
		} catch (err: any) {
			setServerError(err?.message || t('reset.failed'));
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (error || !token) {
		return (
			<section className="auth">
				<header className="auth__head">
					<h1>{t('reset.title')}</h1>
					<p>{t('reset.invalid')}</p>
				</header>
				<Link to="/forgot-password" className="btn">
					{t('reset.requestNew')}
				</Link>
			</section>
		);
	}

	return (
		<section className="auth">
			<header className="auth__head">
				<h1>{t('reset.title')}</h1>
				<p>{t('reset.lead')}</p>
			</header>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label className="field-label" htmlFor="password">
							{t('reset.newPassword')}
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required={true}
							aria-invalid={errors.password ? true : undefined}
							aria-describedby={errors.password ? 'password-error' : undefined}
							autoComplete="new-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FieldError id="password-error" message={errors.password} />
						{errors.password ? null : (
							<span className="field-hint">
								{t('common.passwordHint', { count: MIN_PASSWORD_LENGTH })}
							</span>
						)}
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="password2">
							{t('reset.confirmNewPassword')}
						</label>
						<input
							type="password"
							id="password2"
							name="password2"
							required={true}
							aria-invalid={errors.password2 ? true : undefined}
							aria-describedby={errors.password2 ? 'password2-error' : undefined}
							autoComplete="new-password"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
						/>
						<FieldError id="password2-error" message={errors.password2} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							{t('reset.submit')}
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
		</section>
	);
}
