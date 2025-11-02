import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getCountriesApi,
  getCountriesByNameApi,
} from "../../services/countriesService";
import type { SingleCountry } from "../../components/pages/countries";

interface CountriesState {
  countries: SingleCountry[];
  loading: boolean;
  error: string | null;
  filter: string;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  filter: "",
};

// Async thunk for fetching all countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCountriesApi();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Async thunk for searching countries by name
export const searchCountriesByName = createAsyncThunk(
  "countries/searchCountriesByName",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await getCountriesByNameApi(name);
      return { countries: response, filter: name };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchCountries cases
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.filter = "";
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // searchCountriesByName cases
      .addCase(searchCountriesByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCountriesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.countries;
        state.filter = action.payload.filter;
      })
      .addCase(searchCountriesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, clearError } = countriesSlice.actions;
export default countriesSlice.reducer;
