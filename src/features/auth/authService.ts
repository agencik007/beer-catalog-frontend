import axios from "axios";
import {UserEntity} from "types";
import {toast} from "react-toastify";
import {apiUrl} from "../../config/api";
import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = apiUrl +'/api/users/';

// Register user
export const register = createAsyncThunk('auth/register', async (userData: UserEntity, {rejectWithValue}) => {
    try {
        const response = await axios.post(API_URL + 'register', userData);

        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        }

    } catch (error: any) {
        if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user: UserEntity, {rejectWithValue}) => {
    try {
        const response = await axios.post(API_URL + 'login', user);

        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success('Successfully logged in.')

            return response.data;
        }

    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async(userId: string) => {
    const user = localStorage.getItem('user')
    if(user) {
        const token = JSON.parse(user).token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post(API_URL + 'logout', {}, config)
        localStorage.removeItem('user');
    }
})


const authService = {
    register,
    logout,
    login,
}

export default authService;
