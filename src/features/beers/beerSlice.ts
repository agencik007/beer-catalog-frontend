import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { beerService } from "./beerService";
import { BeerEntity } from "types";

interface BeersStateInterface {
  currentPage: number;
  itemCount: number;
  pageCount: number;
  limitPerPage: number;
  results: BeerEntity[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
}

const initialState: BeersStateInterface = {
  currentPage: 1,
  itemCount: 0,
  pageCount: 0,
  limitPerPage: 0,
  results: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new beer
export const createBeer = createAsyncThunk(
  "beers/create",
  async (beer: BeerEntity, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await beerService.createBeer(beer, token);
    } catch (error: any) {
      const message =
        (error.response && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all beers
export const getBeers = createAsyncThunk(
  "beers/getAll",
  async (params: { page: number; limit: number }, thunkAPI: any) => {
    try {
      return await beerService.getBeers(params.page, params.limit);
    } catch (error: any) {
      const message =
        (error.response && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user beers
export const userBeers = createAsyncThunk(
  "beers/userBeers",
  async (params: { page: number; limit: number }, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await beerService.userBeers(params.page, params.limit, token);
    } catch (error: any) {
      const message =
        (error.response && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user beer
export const deleteBeer = createAsyncThunk(
  "beers/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await beerService.deleteBeer(id, token);
    } catch (error: any) {
      const message =
        (error.response && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const beerSlice = createSlice({
  name: "beer",
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
        state.results.push(action.payload);
      })
      .addCase(createBeer.rejected, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getBeers.pending, (state: BeersStateInterface) => {
        state.isLoading = true;
      })
      .addCase(getBeers.fulfilled, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentPage = action.payload.currentPage;
        state.itemCount = action.payload.itemCount;
        state.pageCount = action.payload.pageCount;
        state.limitPerPage = action.payload.limitPerPage;
        state.results = action.payload.results;
      })
      .addCase(getBeers.rejected, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(userBeers.pending, (state: BeersStateInterface) => {
        state.isLoading = true;
      })
      .addCase(userBeers.fulfilled, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentPage = action.payload.currentPage;
        state.itemCount = action.payload.itemCount;
        state.pageCount = action.payload.pageCount;
        state.limitPerPage = action.payload.limitPerPage;
        state.results = action.payload.results;
      })
      .addCase(userBeers.rejected, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(deleteBeer.pending, (state: BeersStateInterface) => {
        state.isLoading = true;
      })
      .addCase(deleteBeer.fulfilled, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results = state.results.filter(
          (beer: BeerEntity) => beer._id !== action.payload.id
        );
      })
      .addCase(deleteBeer.rejected, (state: BeersStateInterface, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const { reset } = beerSlice.actions;
export default beerSlice.reducer;
