import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthUser, UserEntity } from 'types';
import { authCallbackUrl, authClient, bearer } from '../../lib/authClient';

const STORAGE_KEY = 'user';

type BetterAuthError = { code?: string; message?: string; status?: number } | null;

const errorMessage = (error: BetterAuthError, fallback: string) =>
	error?.message || fallback;

type SessionUser = { id: string; name: string; email: string; role?: string | null };

/** Shape kept in localStorage and Redux; `_id` and `token` stay for the rest of the app. */
export const toAuthUser = (user: SessionUser, token: string): AuthUser => ({
	_id: user.id,
	id: user.id,
	name: user.name,
	email: user.email,
	role: user.role === 'admin' ? 'admin' : 'user',
	token,
});

export const storeUser = (user: AuthUser) =>
	localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

export const getStoredUser = (): AuthUser | null => {
	try {
		const user = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
		return user?.token ? user : null;
	} catch {
		return null;
	}
};

export const clearStoredUser = () => localStorage.removeItem(STORAGE_KEY);

// Register user: the backend requires email verification, so no session is created yet
export const register = createAsyncThunk(
	'auth/register',
	async (
		userData: { name: string; email: string; password: string },
		{ rejectWithValue }
	) => {
		const { error } = await authClient.signUp.email({
			...userData,
			callbackURL: authCallbackUrl(),
		});

		if (error) {
			const message = errorMessage(error, 'Registration failed.');
			toast.error(message);
			return rejectWithValue(message);
		}

		toast.success(
			'Account created! Check your inbox and click the verification link.',
			{ autoClose: 8000 }
		);
		return null;
	}
);

// Login user
export const login = createAsyncThunk(
	'auth/login',
	async (
		user: Pick<UserEntity, 'email' | 'password'>,
		{ rejectWithValue }
	) => {
		const { data, error } = await authClient.signIn.email({
			email: user.email,
			password: user.password,
			callbackURL: authCallbackUrl(),
		});

		if (error || !data?.token) {
			const message =
				error?.code === 'EMAIL_NOT_VERIFIED'
					? 'Please verify your email first. We have sent you a new verification link.'
					: errorMessage(error, 'Invalid email or password.');
			toast.error(message, { autoClose: 8000 });
			return rejectWithValue(message);
		}

		const authUser = toAuthUser(data.user as SessionUser, data.token);
		storeUser(authUser);
		toast.success('Successfully logged in.');
		return authUser;
	}
);

// Finish email verification / OAuth. Prefer the token from the redirect fragment;
// the session cookie lives on the API host and is not sent cross-site.
export const completeAuthRedirect = createAsyncThunk(
	'auth/completeRedirect',
	async (tokenFromRedirect: string | undefined, { rejectWithValue }) => {
		const { data, error } = await authClient.getSession({
			fetchOptions: tokenFromRedirect
				? { ...bearer(tokenFromRedirect), credentials: 'include' }
				: { credentials: 'include' },
		});

		if (error || !data) {
			const message = errorMessage(
				error,
				'Could not sign you in. Please log in again.'
			);
			return rejectWithValue(message);
		}

		const authUser = toAuthUser(
			data.user as SessionUser,
			tokenFromRedirect || data.session.token
		);
		storeUser(authUser);
		toast.success(`Welcome, ${authUser.name}!`);
		return authUser;
	}
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		const user = getStoredUser();
		if (user?.token) {
			await authClient.signOut({
				fetchOptions: { ...bearer(user.token), credentials: 'include' },
			});
		}
	} catch (error: any) {
		console.log(error?.message);
	} finally {
		clearStoredUser();
		toast.info('Successfully logged out');
	}
});

export const requestPasswordReset = async (email: string) => {
	const { error } = await authClient.requestPasswordReset({
		email,
		redirectTo: `${window.location.origin}/reset-password`,
	});
	if (error) throw new Error(errorMessage(error, 'Could not send the reset link.'));
};

export const resetPassword = async (token: string, newPassword: string) => {
	const { error } = await authClient.resetPassword({ token, newPassword });
	if (error) throw new Error(errorMessage(error, 'Could not reset the password.'));
};

export const signInWithProvider = async (provider: 'google' | 'github') => {
	const { error } = await authClient.signIn.social({
		provider,
		callbackURL: authCallbackUrl(),
		errorCallbackURL: `${window.location.origin}/login`,
	});
	if (error) toast.error(errorMessage(error, `Could not sign in with ${provider}.`));
};

const authService = {
	register,
	logout,
	login,
	completeAuthRedirect,
};

export default authService;
