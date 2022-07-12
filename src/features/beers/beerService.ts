import axios from "axios";
import {BeerEntity} from 'types';
import {apiUrl} from "../../config/api";

const API_URL = apiUrl + '/api/beers/';

// Create new beer
export const createBeer = async (beer: BeerEntity, token: any) => {
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
export const userBeers = async () => {
    const json: any = localStorage.getItem('user');
    const userId = JSON.parse(json);

    const response = await axios.get(API_URL);

    return response.data.filter((beer: BeerEntity) => beer.user === userId._id);
}

// Delete user beer
export const deleteBeer = async (beerId: Partial<BeerEntity>, token: any) => {
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