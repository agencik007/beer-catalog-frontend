import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import beerReducer from '../features/beers/beerSlice';

export const store = configureStore({
  reducer: {
      auth: authReducer,
      beers: beerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;