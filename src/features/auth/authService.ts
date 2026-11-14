import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthUser, UserEntity } from 'types';
import { authCallbackUrl, authClient, bearer } from '../../lib/authClient';
import i18n, { currentLanguage } from '../../i18n';
import { en } from '../../i18n/en';

const STORAGE_KEY = 'user';

type BetterAuthError = { code?: string; message?: string; status?: number } | null;

type AuthCode = keyof typeof en.auth.codes;

const isAuthCode = (code: string): code is AuthCode => code in en.auth.codes;

/** Known better-auth codes in the UI language; otherwise the server text (English UI) or the fallback. */
const errorMessage = (error: BetterAuthError, fallback: string) => {
	if (error?.code && isAuthCode(error.code)) {
		return i18n.t(`auth.codes.${error.code}`);
	}
	return (currentLanguage() === 'en' && error?.message) || fallback;
};

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
			// Shown under the form by the Register page
			return rejectWithValue(errorMessage(error, i18n.t('auth.registerFailed')));
		}

		toast.success(i18n.t('auth.registered'), { autoClose: 8000 });
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
					? i18n.t('auth.verifyFirst')
					: errorMessage(error, i18n.t('auth.invalidCredentials'));
			// Shown under the form by the Login page
			return rejectWithValue(message);
		}

		const authUser = toAuthUser(data.user as SessionUser, data.token);
		storeUser(authUser);
		toast.success(i18n.t('auth.loggedIn'));
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
			const message = errorMessage(error, i18n.t('auth.sessionFailed'));
			return rejectWithValue(message);
		}

		const authUser = toAuthUser(
			data.user as SessionUser,
			tokenFromRedirect || data.session.token
		);
		storeUser(authUser);
		toast.success(i18n.t('auth.welcome', { name: authUser.name }));
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
		toast.info(i18n.t('auth.loggedOut'));
	}
});

export const requestPasswordReset = async (email: string) => {
	const { error } = await authClient.requestPasswordReset({
		email,
		redirectTo: `${window.location.origin}/reset-password`,
	});
	if (error) throw new Error(errorMessage(error, i18n.t('auth.resetLinkFailed')));
};

export const resetPassword = async (token: string, newPassword: string) => {
	const { error } = await authClient.resetPassword({ token, newPassword });
	if (error) throw new Error(errorMessage(error, i18n.t('auth.resetFailed')));
};

export const signInWithProvider = async (provider: 'google' | 'github') => {
	const { error } = await authClient.signIn.social({
		provider,
		callbackURL: authCallbackUrl(),
		errorCallbackURL: `${window.location.origin}/login`,
	});
	if (error) toast.error(errorMessage(error, i18n.t('auth.providerFailed', { provider })));
};

const authService = {
	register,
	logout,
	login,
	completeAuthRedirect,
};

export default authService;
