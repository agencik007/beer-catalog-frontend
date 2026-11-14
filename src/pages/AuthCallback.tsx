import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'src/app/store';
import { completeAuthRedirect } from '../features/auth/authService';
import { reset } from '../features/auth/authSlice';
import { Spinner } from '../components/Spinner';
import { useTranslation } from 'react-i18next';

const errorKeys = {
	INVALID_TOKEN: 'callback.invalidLink',
	invalid_token: 'callback.invalidLink',
	TOKEN_EXPIRED: 'callback.expiredLink',
	token_expired: 'callback.expiredLink',
} as const;

function isKnownError(code: string): code is keyof typeof errorKeys {
	return code in errorKeys;
}

// Landing page after email verification or OAuth sign-in
export function AuthCallback() {
	const { t } = useTranslation();
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
				toast.error(String(result.payload ?? t('auth.sessionFailed')));
			}
		});
	}, [error, dispatch, navigate, t]);

	if (error || isError) {
		return (
			<section className="state state--center">
				<h2>{t('callback.title')}</h2>
				<p>
					{error
						? isKnownError(error)
							? t(errorKeys[error])
							: t('callback.errorCode', { code: error })
						: String(message)}
				</p>
				<Link to="/login" className="btn">
					{t('callback.goToLogin')}
				</Link>
			</section>
		);
	}

	return <Spinner />;
}
