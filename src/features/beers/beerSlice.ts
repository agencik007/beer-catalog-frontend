import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {beerService} from "./beerService";
import {BeerEntity} from 'types';

interface BeersStateInterface {
    beers: BeerEntity[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | unknown,
}

const initialState: BeersStateInterface = {
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

// Delete user beer
export const deleteBeer = createAsyncThunk('beers/delete', async (id: Partial<BeerEntity>, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await beerService.deleteBeer(id, token);
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
            .addCase(createBeer.pending, (state: BeersStateInterface) => {
                state.isLoading = true;

            })
            .addCase(createBeer.fulfilled, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers.push(action.payload);
            })
            .addCase(createBeer.rejected, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBeers.pending, (state: BeersStateInterface) => {
                state.isLoading = true;

            })
            .addCase(getBeers.fulfilled, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers = action.payload;
            })
            .addCase(getBeers.rejected, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(userBeers.pending, (state: BeersStateInterface) => {
                state.isLoading = true;

            })
            .addCase(userBeers.fulfilled, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers = action.payload;
            })
            .addCase(userBeers.rejected, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBeer.pending, (state: BeersStateInterface) => {
                state.isLoading = true;

            })
            .addCase(deleteBeer.fulfilled, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.beers = state.beers.filter((beer: BeerEntity) => beer._id !== action.payload.id);
            })
            .addCase(deleteBeer.rejected, (state: BeersStateInterface, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = beerSlice.actions;
export default beerSlice.reducer;