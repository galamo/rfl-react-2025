import { createContext } from "react";
import type { ReactNode, Dispatch } from "react";

export type TimezoneType = "UTC" | "Local";

// State interface
export interface SettingsState {
  timezone: TimezoneType;
  dateFormat: string;
  expenseLimit: number;
}

// Action types
export type SettingsAction =
  | { type: "SET_TIMEZONE"; payload: TimezoneType }
  | { type: "SET_DATE_FORMAT"; payload: string };

// Context interface
interface SettingsContextType {
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export interface SettingsProviderProps {
  children: ReactNode;
}

// Initial state
export const initialSettingsState: SettingsState = {
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  expenseLimit: 5,
};

// Reducer function
export function settingsReducer(
  state: SettingsState,
  action: SettingsAction
): SettingsState {

  switch (action.type) {
    case "SET_TIMEZONE":
      return { ...state, timezone: action.payload };
    case "SET_DATE_FORMAT":
      return { ...state, dateFormat: action.payload };
    default:
      return state;
  }
}
