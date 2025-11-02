import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type TimezoneType = "UTC" | "Local";

export interface SettingsState {
  timezone: TimezoneType;
  dateFormat: string;
  expenseLimit: number;
}

const initialState: SettingsState = {
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  expenseLimit: 10,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTimezone: (state, action: PayloadAction<TimezoneType>) => {
      state.timezone = action.payload;
    },
    setDateFormat: (state, action: PayloadAction<string>) => {
      state.dateFormat = action.payload;
    },
    setExpenseLimit: (state, action: PayloadAction<number>) => {
      state.expenseLimit = action.payload;
    },
  },
});

export const { setTimezone, setDateFormat, setExpenseLimit } =
  settingsSlice.actions;
export default settingsSlice.reducer;
