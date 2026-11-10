import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'src/app/store';
import { completeAuthRedirect } from '../features/auth/authService';
import { reset } from '../features/auth/authSlice';
import { Spinner } from '../components/Spinner';

const errorMessages: Record<string, string> = {
	INVALID_TOKEN: 'This link is invalid. Please request a new one.',
	TOKEN_EXPIRED: 'This link has expired. Log in to receive a new verification email.',
	invalid_token: 'This link is invalid. Please request a new one.',
	token_expired: 'This link has expired. Log in to receive a new verification email.',
};

// Landing page after email verification or OAuth sign-in
export function AuthCallback() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const started = useRef(false);
	const error = searchParams.get('error');

	const { isError, message } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (error || started.current) return;
		started.current = true;

		const hash = new URLSearchParams(window.location.hash.slice(1));
		const token = hash.get('token') ?? undefined;
		if (token) {
			window.history.replaceState(
				null,
				'',
				window.location.pathname + window.location.search
			);
		}

		dispatch(completeAuthRedirect(token)).then((result) => {
			dispatch(reset());
			if (completeAuthRedirect.fulfilled.match(result)) {
				navigate('/', { replace: true });
			} else {
				toast.error(String(result.payload ?? 'Could not sign you in.'));
			}
		});
	}, [error, dispatch, navigate]);

	if (error || isError) {
		return (
			<section className="heading">
				<h1>Sign-in problem</h1>
				<p>{error ? errorMessages[error] ?? `Error: ${error}` : String(message)}</p>
				<Link to="/login">
					<button className="btn">Go to login</button>
				</Link>
			</section>
		);
	}

	return <Spinner />;
}
