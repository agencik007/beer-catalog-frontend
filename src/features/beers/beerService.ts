import axios from "axios";
import {BeerEntity} from 'types';

const API_URL = 'http://localhost:3001/api/beers/';

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
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }

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

export const beerService = {
    createBeer,
    getBeers,
    userBeers,
}