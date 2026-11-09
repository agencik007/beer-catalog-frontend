import { SyntheticEvent, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPasswordReset } from '../features/auth/authService';
import { Spinner } from '../components/Spinner';

export function ForgotPassword() {
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
		<section className="heading">
			<h1>
				<FaKey /> Forgot password
			</h1>
			{sent ? (
				<p>
					If an account exists for {email}, you will receive an email with a link to
					reset your password.
				</p>
			) : (
				<>
					<p>Enter your email and we will send you a reset link.</p>
					<section className="form">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									name="email"
									required={true}
									value={email}
									placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-block">
									Send reset link
								</button>
							</div>
						</form>
					</section>
				</>
			)}
			<p>
				<Link to="/login">Back to login</Link>
			</p>
		</section>
	);
}
