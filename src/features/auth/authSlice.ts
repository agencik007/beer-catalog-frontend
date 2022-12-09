import {createSlice} from "@reduxjs/toolkit";
import {UserEntity} from "types";
import { login, logout, register } from "./authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user')!);

export interface AuthUserInterface {
    user: UserEntity | null;
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
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state: AuthUserInterface) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state: AuthUserInterface, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
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
            .addCase(logout.pending, (state: AuthUserInterface) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state: AuthUserInterface) => {
                state.user = null;
            })
            .addCase(logout.rejected, (state: AuthUserInterface, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;
