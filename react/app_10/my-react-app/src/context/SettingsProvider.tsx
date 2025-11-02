import { useReducer } from "react";
import {
  SettingsContext,
  type SettingsProviderProps,
  settingsReducer,
  initialSettingsState,
} from "./SettingsContext";

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(settingsReducer, initialSettingsState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}
