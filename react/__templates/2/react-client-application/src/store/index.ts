import { configureStore } from "@reduxjs/toolkit"
import countriesReducers from "./slices/countries"
import settingsReducers from "./slices/settings"

export const store = configureStore({
    reducer: {
        countries: countriesReducers,
        settingsSlice: settingsReducers
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



// login => state => reducer
// countreis => state =>reducer
