import { useState } from "react";
import {
  SettingsContext,
  type SettingsProviderProps,
  type TimezoneType,
} from "./SettingsContext";

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [timezone, setTimezone] = useState<TimezoneType>("UTC");
  const [dateFormat, setDateFormat] = useState<string>("MM/DD/YYYY");

  return (
    <SettingsContext.Provider value={{ timezone, setTimezone, dateFormat, setDateFormat }}>
      {children}
    </SettingsContext.Provider>
  );
}
