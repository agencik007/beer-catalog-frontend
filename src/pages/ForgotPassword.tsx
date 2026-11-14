import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPasswordReset } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';
import { useTranslation } from 'react-i18next';

export function ForgotPassword() {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [sent, setSent] = useState(false);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await requestPasswordReset(email);
			setSent(true);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="auth">
			<header className="auth__head">
				<h1>{t('forgot.title')}</h1>
				<p>
					{sent ? t('forgot.sent', { email }) : t('forgot.lead')}
				</p>
			</header>
			{sent ? null : (
				<section className="form">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label className="field-label" htmlFor="email">
								{t('common.email')}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required={true}
								autoComplete="email"
								value={email}
								placeholder={t('common.emailPlaceholder')}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-block">
								{t('forgot.submit')}
							</button>
						</div>
					</form>
				</section>
			)}
			<p className="auth__foot">
				<Link to="/login">{t('forgot.back')}</Link>
			</p>
		</section>
	);
}
