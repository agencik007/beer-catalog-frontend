import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {beerService} from "./beerService";
import {BeerEntity} from 'types';

const initialState = {
    beers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new beer
export const createBeer = createAsyncThunk('beers/create', async (beer: BeerEntity, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await beerService.createBeer(beer, token);
    } catch (error: any) {
        const message = (error.response && error.respone.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all beers
export const getBeers = createAsyncThunk('beers/getAll', async (_, thunkAPI: any) => {
    try {
        // const token = thunkAPI.getState().auth.user.token;

        return await beerService.getBeers();
    } catch (error: any) {
        const message = (error.response && error.respone.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get user beers
export const userBeers = createAsyncThunk('beers/userBeers', async (_, thunkAPI: any) => {
    try {
        return await beerService.userBeers();
    } catch (error: any) {
        const message = (error.response && error.respone.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const beerSlice = createSlice({
    name: 'beer',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBeer.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(createBeer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // @ts-ignore
                state.beers.push(action.payload);
            })
            .addCase(createBeer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as any;
            })
            .addCase(getBeers.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(getBeers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers = action.payload;
            })
            .addCase(getBeers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as any;
            })
            .addCase(userBeers.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(userBeers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers = action.payload;
            })
            .addCase(userBeers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as any;
            })
    }
})

export const {reset} = beerSlice.actions;
export default beerSlice.reducer;