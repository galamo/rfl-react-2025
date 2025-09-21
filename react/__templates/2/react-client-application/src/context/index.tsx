import { createContext, Dispatch } from "react";

export interface IGlobalState {
  isLocalTime: boolean;
  isPrettyNumber: boolean
  dispatch?: Dispatch<{ type: string; payload?: Partial<IGlobalState> }>;
}

export const initialState: IGlobalState = {
  isLocalTime: true,
  isPrettyNumber: false
};

export const SettingsContext = createContext<IGlobalState>(initialState);
