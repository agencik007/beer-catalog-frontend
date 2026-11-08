import { SyntheticEvent, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';

const MIN_PASSWORD_LENGTH = 8;

export function ResetPassword() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const token = searchParams.get('token');
	const error = searchParams.get('error');

	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (password.length < MIN_PASSWORD_LENGTH) {
			toast.error(`Password must have at least ${MIN_PASSWORD_LENGTH} characters.`);
			return;
		}
		if (password !== password2) {
			toast.error('Passwords do not match.');
			return;
		}

		setIsLoading(true);
		try {
			await resetPassword(token!, password);
			toast.success('Password changed. You can log in now.');
			navigate('/login', { replace: true });
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (error || !token) {
		return (
			<section className="heading">
				<h1>
					<FaKey /> Reset password
				</h1>
				<p>This reset link is invalid or has expired.</p>
				<Link to="/forgot-password">
					<button className="btn">Request a new link</button>
				</Link>
			</section>
		);
	}

	return (
		<section className="heading">
			<h1>
				<FaKey /> Reset password
			</h1>
			<p>Choose a new password.</p>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							name="password"
							required={true}
							value={password}
							placeholder="New password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							name="password2"
							required={true}
							value={password2}
							placeholder="Confirm new password"
							onChange={(e) => setPassword2(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Change password
						</button>
					</div>
				</form>
			</section>
		</section>
	);
}
