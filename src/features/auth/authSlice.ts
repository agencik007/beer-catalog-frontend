import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from './authService';
import {UserEntity} from "types";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user')!);

interface AuthUserInterface {
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

// Register user
export const register = createAsyncThunk('auth/register', async (user: UserEntity, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error: any) {
        const message = (error.response && error.respone.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: UserEntity, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error: any) {
        const message = (error.response && error.respone.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout();
})


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
            .addCase(logout.fulfilled, (state: AuthUserInterface) => {
                state.user = null;
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;
