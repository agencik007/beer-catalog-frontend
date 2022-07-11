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

// Get beers
export const getBeers = async () => {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     }
    // }

    const response = await axios.get(API_URL);


    return response.data;
}

export const beerService = {
    createBeer,
    getBeers,
}