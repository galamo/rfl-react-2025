import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CountryApi } from "../../../components/pages/countriesPage"

interface ICountriesState {
    countries: Array<CountryApi>;
    favorites: Array<CountryApi>;
    counter: number
}

const initState: ICountriesState = {
    countries: [],
    favorites: [],
    counter: 0
}

export const countriesSlice = createSlice({
    name: "countries",
    initialState: initState,
    reducers: {

        addToFavorite: (state, action: PayloadAction<CountryApi>) => {
            state.favorites.push(action.payload)
        },
        increaseCounter: (state, action: PayloadAction<number>) => {
            state.counter = state.counter + 1
        }
    }
})

export const { addToFavorite, increaseCounter } = countriesSlice.actions;
export default countriesSlice.reducer