import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { apiUrl } from '../config/api';

export const authClient = createAuthClient({
	baseURL: apiUrl,
	plugins: [adminClient()],
});

/** OAuth providers enabled on the backend, e.g. VITE_AUTH_PROVIDERS=google,github */
export const oauthProviders = (import.meta.env.VITE_AUTH_PROVIDERS || '')
	.split(',')
	.map((p: string) => p.trim())
	.filter((p: string): p is 'google' | 'github' => p === 'google' || p === 'github');

/** Where the backend redirects after email verification or OAuth sign-in */
export const authCallbackUrl = () => `${window.location.origin}/auth/callback`;

export const bearer = (token?: string | null) => ({
	headers: { Authorization: `Bearer ${token ?? ''}` },
});
