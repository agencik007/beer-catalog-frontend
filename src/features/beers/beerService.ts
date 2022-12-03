import axios from "axios";
import {BeerEntity, UserEntity} from 'types';
import {apiUrl} from "../../config/api";

const API_URL = apiUrl + '/api/beers';


// Create new beer
export const createBeer = async (beer: BeerEntity, token: Partial<UserEntity>) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.post(API_URL, beer, config);

        return response.data;
    } catch (error: any) {
        window.location.href = '/';
    }
}

// Get all beers
export const getBeers = async (currentPage: number, limitPerPage: number) => {
    const params = {
        page: currentPage,
        limit: limitPerPage,
    }

    const response = await axios.get(API_URL + `?page=${params.page}&limit=${params.limit}`);
    
    return response.data;
}

// Get user beers
export const userBeers = async (currentPage: number, limitPerPage: number, token: Partial<UserEntity>) => {
    
    const params = {
        page: currentPage,
        limit: limitPerPage
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.get(API_URL + `/userbeers?page=${params.page}&limit=${params.limit}`, config);

        return response.data;
    } catch (error: any) {
        window.location.href = '/';
    }
    
}

// Delete user beer
export const deleteBeer = async (beerId: string, token: Partial<UserEntity>) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.delete(API_URL + "/" + beerId, config);

        return response.data;
    } catch (error: any) {
        window.location.href = '/';
    }
}

export const beerService = {
    createBeer,
    getBeers,
    userBeers,
    deleteBeer,
}