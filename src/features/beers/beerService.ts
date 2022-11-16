import axios from "axios";
import {BeerEntity, UserEntity} from 'types';
import {apiUrl} from "../../config/api";

const API_URL = apiUrl + '/api/beers/';

// Create new beer
export const createBeer = async (beer: BeerEntity, token: Partial<UserEntity>) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, beer, config);

    return response.data;
}

// Get all beers
export const getBeers = async () => {
    const response = await axios.get(API_URL);
    
    return response.data;
}

// Get user beers
export const userBeers = async (token: Partial<UserEntity>) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'userbeers', config);
    
    return response.data;
}

// Delete user beer
export const deleteBeer = async (beerId: Partial<BeerEntity>, token: Partial<UserEntity>) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + beerId, config);

    return response.data;
}

export const beerService = {
    createBeer,
    getBeers,
    userBeers,
    deleteBeer,
}