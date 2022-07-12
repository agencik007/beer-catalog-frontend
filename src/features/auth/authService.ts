import axios from "axios";
import {UserEntity} from "types";
import {toast} from "react-toastify";
import {apiUrl} from "../../config/api";

const API_URL = apiUrl +'/api/users/';

// Register user
export const register = async (userData: UserEntity) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Login user
export const login = async (userData: UserEntity) => {
    try {
        const response = await axios.post(API_URL + 'login', userData);

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        toast.success('Successfully logged in!');

        return response.data;
    } catch (error) {
        toast.error('Invalid email or password.')
    }

}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login,
}

export default authService;
