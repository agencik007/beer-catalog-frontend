import { createSlice } from '@reduxjs/toolkit';
import { AuthUser } from 'types';
import {
	completeAuthRedirect,
	getStoredUser,
	login,
	logout,
	register,
} from './authService';

//Get user from localStorage (sessions from the old JWT auth have no Better Auth token and are dropped)
const user = getStoredUser();

export interface AuthUserInterface {
	user: AuthUser | null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string | unknown;
}

const initialState: AuthUserInterface = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
		},
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state: AuthUserInterface) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state: AuthUserInterface) => {
				// No session until the email is verified
				state.isLoading = false;
				state.isSuccess = true;
				state.user = null;
			})
			.addCase(register.rejected, (state: AuthUserInterface, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state: AuthUserInterface) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state: AuthUserInterface, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state: AuthUserInterface, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(completeAuthRedirect.pending, (state: AuthUserInterface) => {
				state.isLoading = true;
			})
			.addCase(
				completeAuthRedirect.fulfilled,
				(state: AuthUserInterface, action) => {
					state.isLoading = false;
					state.isSuccess = true;
					state.user = action.payload;
				}
			)
			.addCase(
				completeAuthRedirect.rejected,
				(state: AuthUserInterface, action) => {
					state.isLoading = false;
					state.isError = true;
					state.message = action.payload;
					state.user = null;
				}
			)
			.addCase(logout.pending, (state: AuthUserInterface) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state: AuthUserInterface) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(logout.rejected, (state: AuthUserInterface, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset, clearUser } = authSlice.actions;
export default authSlice.reducer;
