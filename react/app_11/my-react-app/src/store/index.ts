import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import countriesReducer from './slices/countriesSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

